import catalog from './project-data.cjs';
import { cleanText as text, extractReadme, summarizeOverview, parsePublicSummary, validatePublicSummary, MAX_README_BYTES, MAX_PUBLIC_SUMMARY_BYTES } from './project-content.mjs';
export { extractReadme } from './project-content.mjs';

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

function safeDate(value) {
  return typeof value === 'string' && /^\d{4}-\d\d-\d\dT/.test(value) && Number.isFinite(Date.parse(value))
    ? new Date(value).toISOString() : null;
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
      const summary = summarizeOverview(overview);
      if (overview.length || features.length || typeof readme.progress === 'string') entry.readme = {
        overview, features,
        ...(summary ? { summary } : {}),
        ...(typeof readme.progress === 'string' ? { progress: text(readme.progress, 280) } : {}),
        url: `${repo.url}#readme`,
      };
    }
    if (!publicIds.has(id) && project?.publicSummary) {
      const approved = validatePublicSummary({ version: 1, publish: true, ...project.publicSummary });
      if (approved) entry.publicSummary = approved;
    } else if (!publicIds.has(id) && project?.publicSummary === null && project?.contentSource === 'reviewed-fallback') {
      entry.publicSummary = null;
      entry.contentSource = 'reviewed-fallback';
    }
    const contentCheckedAt = safeDate(project?.contentCheckedAt);
    const contentSource = publicIds.has(id) ? 'readme' : 'approved-summary';
    if ((entry.readme || entry.publicSummary) && project?.contentSource === contentSource && contentCheckedAt) {
      entry.contentSource = contentSource;
      entry.contentCheckedAt = contentCheckedAt;
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

async function readBounded(response, maximum = MAX_README_BYTES) {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maximum) { await reader.cancel(); return ''; }
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
  // Validators live only in the server cache; the returned catalog is a separate allowlist.
  const validators = options.validators || {};
  let refreshed = false;
  function safeEtag(value) {
    return typeof value === 'string' && value.length <= 512 && /^[\x20-\x7e]+$/.test(value) ? value : '';
  }
  async function github(name, path, raw = false, etag = '') {
    if (Date.now() >= deadline) return null;
    try {
      return await fetchImpl(`https://api.github.com/repos/${OWNER}/${encodeURIComponent(name)}/${path}`, {
        headers: { ...headers, Accept: raw ? 'application/vnd.github.raw+json' : 'application/vnd.github+json', ...(safeEtag(etag) ? { 'If-None-Match': etag } : {}) },
        signal: AbortSignal.timeout(Math.min(7000, Math.max(1, deadline - Date.now()))),
      });
    } catch { return null; }
  }
  async function update(repo) {
    const current = { ...byId.get(repo.id) };
    const savedValidators = validators[repo.id] || {};
    const remember = (field, response) => {
      const etag = safeEtag(response.headers.get('etag'));
      if (etag) savedValidators[field] = etag;
      else delete savedValidators[field];
    };
    const commits = await github(repo.name, 'commits?per_page=1', false, current.commitState !== 'unavailable' ? savedValidators.commits : '');
    if (commits?.status === 409) {
      current.lastCommitAt = null;
      current.commitState = 'empty';
      remember('commits', commits);
      refreshed = true;
    } else if (commits?.status === 304 && current.commitState !== 'unavailable') {
      refreshed = true;
    } else if (commits?.ok) {
      try {
        const list = await commits.json();
        const date = Array.isArray(list) && safeDate(list[0]?.commit?.committer?.date);
        if (date) { current.lastCommitAt = date; current.commitState = 'known'; remember('commits', commits); refreshed = true; }
        else if (Array.isArray(list) && list.length === 0) { current.lastCommitAt = null; current.commitState = 'empty'; remember('commits', commits); refreshed = true; }
      } catch { /* A malformed upstream response keeps the last successful date. */ }
    }
    const previousContent = repo.public ? current.readme : current.publicSummary;
    const path = repo.public ? 'readme' : 'contents/portfolio.public.json';
    const response = await github(repo.name, path, true, previousContent ? savedValidators.content : '');
    const restoreReviewedSummary = () => {
      current.publicSummary = null;
      current.contentSource = 'reviewed-fallback';
      delete current.contentCheckedAt;
      delete savedValidators.content;
    };
    if (response?.status === 304 && previousContent) {
      current.contentSource = repo.public ? 'readme' : 'approved-summary';
      current.contentCheckedAt = new Date(now).toISOString();
      refreshed = true;
    } else if (response?.ok) {
      try {
        const source = await readBounded(response, repo.public ? MAX_README_BYTES : MAX_PUBLIC_SUMMARY_BYTES);
        const content = repo.public ? extractReadme(source, `${repo.url}#readme`) : parsePublicSummary(source);
        if (content) {
          if (repo.public) current.readme = content;
          else current.publicSummary = content;
          current.contentSource = repo.public ? 'readme' : 'approved-summary';
          current.contentCheckedAt = new Date(now).toISOString();
          remember('content', response);
          refreshed = true;
        } else if (!repo.public) {
          restoreReviewedSummary();
        }
      } catch { /* Documentation availability must not affect dates or prior safe text. */ }
    } else if (!repo.public && (response?.status === 404 || response?.status === 410)) {
      restoreReviewedSummary();
    }
    validators[repo.id] = savedValidators;
    byId.set(repo.id, current);
  }
  let index = 0;
  async function worker() {
    while (index < jobs.length) await update(jobs[index++]);
  }
  await Promise.all(Array.from({ length: Math.min(4, jobs.length) }, worker));
  return { generatedAt: refreshed ? new Date(now).toISOString() : safeDate(options.previous?.generatedAt) || snapshot.generatedAt, projects: sanitizeCatalog({ projects: [...byId.values()] }) };
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
      const validators = cached?.validators || {};
      const value = await fetchProjectUpdates(env, { ...options, now, previous: cached?.value || snapshot, validators });
      await writeCache(cache, key, { expiresAt: now + ttl, value, validators });
      return value;
    })().finally(() => pending.delete(key)));
    payload = await pending.get(key);
  }
  return Response.json({ generatedAt: safeDate(payload?.generatedAt) || snapshot.generatedAt, projects: sanitizeCatalog(payload) }, {
    headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300', 'X-Content-Type-Options': 'nosniff' },
  });
}
