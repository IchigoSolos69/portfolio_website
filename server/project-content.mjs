export const MAX_README_BYTES = 64 * 1024;
export const MAX_PUBLIC_SUMMARY_BYTES = 4 * 1024;

export function cleanText(value, limit = 700) {
  return String(value || '').replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '').replace(/[*_`~]/g, '')
    .replace(/&(?:nbsp|amp|lt|gt|quot);/g, entity => ({ '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"' })[entity])
    .replace(/\s+/g, ' ').trim().slice(0, limit);
}

export function summarizeOverview(overview) {
  const paragraphs = Array.isArray(overview) ? overview : [];
  for (const paragraph of paragraphs) {
    const sentences = cleanText(paragraph).match(/.+?(?:[.!?](?=\s|$)|$)/g) || [];
    for (const raw of sentences) {
      const sentence = raw.trim();
      if (sentence.length < 35 || isDocumentationPreamble(sentence) || isSetupParagraph(sentence) || isFutureWork(sentence)) continue;
      if (sentence.length <= 240) return sentence;
      const fragment = sentence.slice(0, 239);
      const boundary = fragment.search(/\s+\S*$/);
      if (boundary > 0) return `${fragment.slice(0, boundary).trimEnd()}…`;
    }
  }
  return '';
}

const SUMMARY_STATUSES = new Set(['Prototype', 'Concept', 'Concept website', 'Demo data']);
const SUMMARY_FIELDS = new Set(['version', 'publish', 'summary', 'progressBrief', 'status']);

function approvedText(value, limit) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= limit
    && !/[<>\r\n\u0000-\u001f\u007f`*_~]/.test(value)
    && !/(?:https?:\/\/|www\.|github\.com|javascript:|data:|!?\[[^\]]*\]\s*\()/i.test(value);
}

export function validatePublicSummary(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)
    || Object.keys(value).some(key => !SUMMARY_FIELDS.has(key))
    || value.version !== 1 || value.publish !== true || !approvedText(value.summary, 280)
    || (value.progressBrief !== undefined && !approvedText(value.progressBrief, 160))
    || (value.status !== undefined && !SUMMARY_STATUSES.has(value.status))) return null;
  return {
    summary: value.summary.trim(),
    ...(value.progressBrief !== undefined ? { progressBrief: value.progressBrief.trim() } : {}),
    ...(value.status !== undefined ? { status: value.status } : {}),
  };
}

export function parsePublicSummary(source) {
  if (typeof source !== 'string' || new TextEncoder().encode(source).byteLength > MAX_PUBLIC_SUMMARY_BYTES) return null;
  try { return validatePublicSummary(JSON.parse(source)); } catch { return null; }
}

function isDocumentationPreamble(value) {
  return /^(?:checked|reviewed|audited|last updated|documentation updated|updated on|as of|recorded on)\b/i.test(value)
    || /^(?:(?:project|current|app|application|release)\s+)?version\s*:/i.test(value)
    || /^(?:platform|license|runtime|java|node(?:\.js)?|python)\s*:/i.test(value)
    || /^(?:documentation|docs?)\s+(?:reviewed|audited|checked|updated)\b/i.test(value)
    || /^(?:the\s+)?(?:earlier|previous)\s+(?:repository\s+)?audit\b/i.test(value)
    || /\b(?:these observations describe|this documentation update|fresh (?:source )?checkout|historical (?:test|result)|not a new .{0,35}test run)\b/i.test(value);
}

function isSetupParagraph(value) {
  return /^(?:the )?(?:local (?:native )?|native |firebase |backend |environment |build )(?:configs?|configuration|settings|setup)\b/i.test(value)
    || /^(?:npm|pnpm|yarn|pip|python|node|git clone|curl|docker|cargo|sudo|cd)\s/i.test(value)
    || /\b(?:install the local|run the following|native firebase configs|setup screen|use .{0,35}(?:chosen password|sign.in))\b/i.test(value);
}

function isFutureWork(value) {
  return /^(?:planned|future|roadmap|todo|coming soon)\b/i.test(value)
    || /\b(?:not yet implemented|coming soon|will (?:support|provide|include|enable|add|be implemented))\b/i.test(value);
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
    const value = cleanText(paragraph.join(' '));
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
      const title = cleanText(heading[1]).toLowerCase();
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
        const cells = line.split('|').slice(1, -1).map(cell => cleanText(cell, 400));
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
      const value = cleanText(item[1], 240);
      if (section === 'features' && value.length > 12 && features.length < 8 && !features.includes(value)
        && !isFutureWork(value) && !isSetupParagraph(value)) features.push(value);
      if (section === 'progress' && value.length > 20) considerProgress(value);
    } else if (section === 'overview' || section === 'progress') paragraph.push(line);
  }
  flush();
  if (!overview.length && !features.length && !progress) return null;
  const summary = summarizeOverview(overview);
  return { overview, features, ...(summary ? { summary } : {}), ...(progress ? { progress } : {}), url };
}

