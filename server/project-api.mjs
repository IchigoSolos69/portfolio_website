import catalog from './project-data.cjs';

const { repositories, snapshot } = catalog;

const OWNER = repositories.owner;
const PRIVATE_IDS = [
  'rarecomforts-commerce', 'creator-partnerships', 'nexora', 'community-showcase',
  'healthcare-app', 'internity', 'sort2save', 'e-consultation',
  'support-ticket-monitor', 'cinema-experience', 'calories-calculator', 'public-issue-reporting',
];
const publicRepos = repositories.repositories.map(repo => ({
  id: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  name: repo.name,
  url: repo.url,
}));
const publicIds = new Set(publicRepos.map(repo => repo.id));
const allIds = [...publicIds, ...PRIVATE_IDS];
const memoryCache = new Map();
const pendingByCache = new WeakMap();
const MAX_README_BYTES = 64 * 1024;

function safeDate(value) {
  return typeof value === 'string' && /^\d{4}-\d\d-\d\dT/.test(value) && Number.isFinite(Date.parse(value))
    ? new Date(value).toISOString() : null;
}

function text(value, limit = 700) {
  return String(value || '').replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '').replace(/[*_`~]/g, '')
    .replace(/&(?:nbsp|amp|lt|gt|quot);/g, entity => ({ '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' })[entity])
    .replace(/\s+/g, ' ').trim().slice(0, limit);
}

function isDocumentationPreamble(value) {
  return /^(?:checked|reviewed|audited|last updated|documentation updated|updated on|as of|recorded on)\b/i.test(value)
    || /\b(?:these observations describe|this documentation update|fresh (?:source )?checkout|historical (?:test|result)|not a new .{0,35}test run)\b/i.test(value);
}

function isSetupParagraph(value) {
  return /^(?:the )?(?:local (?:native )?|native |firebase |backend |environment |build )(?:configs?|configuration|settings|setup)\b/i.test(value)
    || /\b(?:install the local|run the following|native firebase configs|setup screen|use .{0,35}(?:chosen password|sign.in))\b/i.test(value);
}

// Keep README material as text, and distinguish capabilities from future-work sections.
export function extractReadme(markdown, url) {
  if (typeof markdown !== 'string') return null;
  const source = markdown.slice(0, MAX_README_BYTES)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  const overview = [];
  const features = [];
  let progress;
  let progressScore = 0;
  let section = 'overview';
  let fenced = false;
  let paragraph = [];
  function considerProgress(value, label = '') {
    if (isDocumentationPreamble(value) || isSetupParagraph(value)
      || /\b(?:recorded|historical|python checks|frontend checks|test results|serving parity|gpu environment)\b/i.test(label)) return;
    let score = 0;
    if (/\b(?:interrupted|blocked|stopped|incomplete)\b/i.test(value)) score += 8;
    if (/\b(?:pending|unfinished|undertrained|unverified|not (?:yet |fully )?(?:finished|completed|verified))\b/i.test(value)) score += 5;
    if (/\b(?:prototype|beta|pilot|in development)\b/i.test(value)) score += 3;
    if (/\b(?:implemented|completed|available|working)\b/i.test(value)) score += 2;
    if (/\b(?:full experiment|current stage|project status)\b/i.test(label)) score += 2;
    if (score > progressScore) { progress = value.slice(0, 280); progressScore = score; }
  }
  function flush() {
    const value = text(paragraph.join(' '));
    paragraph = [];
    if (value.length < 35) return;
    if (section === 'overview' && overview.length < 3 && !overview.includes(value)
      && !isDocumentationPreamble(value) && !isSetupParagraph(value)) overview.push(value);
    if (section === 'progress') considerProgress(value);
  }
  for (const line of source.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) { flush(); fenced = !fenced; continue; }
    if (fenced) continue;
    const heading = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*$/);
    if (heading) {
      flush();
      const title = text(heading[1]).toLowerCase();
      if (/^(?:status|current status|progress|current progress|development status|known limitations|limitations)\b/.test(title)) section = 'progress';
      else if (/\b(?:install|setup|requirements|prerequisites|dependencies|quick.?start|getting started|usage|running|configuration|license|contribut|roadmap|future|planned|todo|project structure|directory)\b/.test(title)) section = 'skip';
      else if (/\b(?:features|capabilities|workflows|functionality|what it does|what it can do)\b/.test(title)) section = 'features';
      else if (/^overview$|^about\b|^introduction$|^summary$|^what is\b/.test(title)) section = 'overview';
      else if (/^\s*#\s/.test(line)) section = 'overview';
      else section = 'skip';
      continue;
    }
    if (!line.trim()) { flush(); continue; }
    if (/^\s*\|.*\|/.test(line)) {
      flush();
      if (section === 'progress') {
        const cells = line.split('|').slice(1, -1).map(cell => text(cell, 400));
        if (cells.length >= 2 && !/^(?:area|setting|status|:?-{3,}:?)$/i.test(cells[0])) {
          considerProgress(`${cells[0]}: ${cells.slice(1).join('; ')}`, cells[0]);
        }
      }
      continue;
    }
    if (/^\s*(?:[-=:]{3,}|<|!\[|\[!\[)/.test(line)) { flush(); continue; }
    const item = line.match(/^\s*(?:[-*+]\s+|\d+[.)]\s+)(.+)/);
    if (item) {
      flush();
      const value = text(item[1], 240);
      if (section === 'features' && value.length > 12 && features.length < 8 && !features.includes(value)) features.push(value);
      if (section === 'progress' && value.length > 20) considerProgress(value);
    } else if (section === 'overview' || section === 'progress') paragraph.push(line);
  }
  flush();
  if (!overview.length && !features.length && !progress) return null;
  return { overview, features, ...(progress ? { progress } : {}), url };
}

function sanitizeCatalog(value) {
  const input = new Map((Array.isArray(value?.projects) ? value.projects : []).map(project => [project?.id, project]));
  return allIds.map(id => {
    const project = input.get(id);
    const lastCommitAt = safeDate(project?.lastCommitAt);
    const commitState = lastCommitAt ? 'known' : project?.commitState === 'empty' ? 'empty' : 'unavailable';
    const entry = { id, lastCommitAt, commitState };
    if (publicIds.has(id) && project?.readme) {
      const repo = publicRepos.find(repo => repo.id === id);
      const readme = project.readme;
      const overview = (Array.isArray(readme.overview) ? readme.overview : []).map(value => text(value)).filter(Boolean).slice(0, 3);
      const features = (Array.isArray(readme.features) ? readme.features : []).map(value => text(value, 240)).filter(Boolean).slice(0, 8);
      if (overview.length || features.length || typeof readme.progress === 'string') entry.readme = {
        overview, features,
        ...(typeof readme.progress === 'string' ? { progress: text(readme.progress, 280) } : {}),
        url: `${repo.url}#readme`,
      };
    }
    return entry;
  });
}

function getPrivateRepositories(env) {
  let mapping;
  try { mapping = JSON.parse(env.PRIVATE_PROJECT_REPOS || '{}'); } catch { return []; }
  if (!mapping || typeof mapping !== 'object' || Array.isArray(mapping)) return [];
  return PRIVATE_IDS.flatMap(id => {
    const name = mapping[id];
    return typeof name === 'string' && /^[A-Za-z0-9_.-]{1,100}$/.test(name) && !/^\.+$/.test(name)
      ? [{ id, name }] : [];
  });
}

function getToken(env) {
  const value = env.GITHUB_TOKEN || env.GH_TOKEN;
  return typeof value === 'string' && value.length <= 4096 && !/[\r\n]/.test(value) ? value.trim() : '';
}

async function readBounded(response) {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_README_BYTES) { await reader.cancel(); return ''; }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const buffer = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(buffer);
}

export async function fetchProjectUpdates(env = {}, options = {}) {
  const fetchImpl = options.fetchImpl || fetch;
  const now = options.now ?? Date.now();
  const previous = sanitizeCatalog(options.previous || snapshot);
  const byId = new Map(previous.map(project => [project.id, project]));
  const token = getToken(env);
  const privateRepos = token ? getPrivateRepositories(env) : [];
  const deadline = Date.now() + 24000;
  const jobs = [...publicRepos.map(repo => ({ ...repo, public: true })), ...privateRepos];
  const headers = { 'User-Agent': 'Adi-Maitre-Portfolio', 'X-GitHub-Api-Version': '2022-11-28', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  async function github(name, path, raw = false) {
    if (Date.now() >= deadline) return null;
    try {
      return await fetchImpl(`https://api.github.com/repos/${OWNER}/${encodeURIComponent(name)}/${path}`, {
        headers: { ...headers, Accept: raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json' },
        signal: AbortSignal.timeout(Math.min(7000, Math.max(1, deadline - Date.now()))),
      });
    } catch { return null; }
  }
  async function update(repo) {
    const current = { ...byId.get(repo.id) };
    const commits = await github(repo.name, 'commits?per_page=1');
    if (commits?.status === 409) {
      current.lastCommitAt = null;
      current.commitState = 'empty';
    } else if (commits?.ok) {
      try {
        const list = await commits.json();
        const date = Array.isArray(list) && safeDate(list[0]?.commit?.committer?.date);
        if (date) { current.lastCommitAt = date; current.commitState = 'known'; }
        else if (Array.isArray(list) && list.length === 0) { current.lastCommitAt = null; current.commitState = 'empty'; }
      } catch { /* A malformed upstream response keeps the last successful date. */ }
    }
    if (repo.public) {
      const response = await github(repo.name, 'readme', true);
      if (response?.ok) {
        try {
          const readme = extractReadme(await readBounded(response), `${repo.url}#readme`);
          if (readme) current.readme = readme;
        } catch { /* README availability must not affect commit dates. */ }
      }
    }
    byId.set(repo.id, current);
  }
  let index = 0;
  async function worker() {
    while (index < jobs.length) await update(jobs[index++]);
  }
  await Promise.all(Array.from({ length: Math.min(4, jobs.length) }, worker));
  return { generatedAt: new Date(now).toISOString(), projects: sanitizeCatalog({ projects: [...byId.values()] }) };
}

function hash(value) {
  let result = 2166136261;
  for (let i = 0; i < value.length; i++) result = Math.imul(result ^ value.charCodeAt(i), 16777619);
  return (result >>> 0).toString(36);
}

async function readCache(cache, key) {
  try {
    if (typeof cache.match === 'function') {
      const response = await cache.match(new Request(key));
      return response ? await response.json() : null;
    }
    return cache.get(key) || null;
  } catch { return null; }
}

async function writeCache(cache, key, entry) {
  try {
    if (typeof cache.put === 'function') {
      // Retain a stale safe catalog for outages; expiresAt controls GitHub refresh timing.
      await cache.put(new Request(key), new Response(JSON.stringify(entry), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=604800' } }));
    } else cache.set(key, entry);
  } catch { /* The endpoint still works when edge caching is unavailable. */ }
}

export async function handleProjectsRequest(request, env = {}, options = {}) {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET' } });
  const now = options.now ?? Date.now();
  const token = getToken(env);
  const ttl = token ? 15 * 60 * 1000 : 60 * 60 * 1000;
  const cache = options.cache || memoryCache;
  const key = `https://portfolio.internal/api/projects?scope=${hash(`${token}\n${JSON.stringify(getPrivateRepositories(env))}`)}`;
  const cached = await readCache(cache, key);
  let payload;
  if (cached?.expiresAt > now) payload = cached.value;
  else {
    let pending = pendingByCache.get(cache);
    if (!pending) { pending = new Map(); pendingByCache.set(cache, pending); }
    if (!pending.has(key)) pending.set(key, (async () => {
      const value = await fetchProjectUpdates(env, { ...options, now, previous: cached?.value || snapshot });
      await writeCache(cache, key, { expiresAt: now + ttl, value });
      return value;
    })().finally(() => pending.delete(key)));
    payload = await pending.get(key);
  }
  return Response.json({ generatedAt: safeDate(payload?.generatedAt) || snapshot.generatedAt, projects: sanitizeCatalog(payload) }, {
    headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300', 'X-Content-Type-Options': 'nosniff' },
  });
}
