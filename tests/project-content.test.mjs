import assert from 'node:assert/strict';
import test from 'node:test';
import { extractReadme, parsePublicSummary, summarizeOverview } from '../server/project-content.mjs';
import { fetchProjectUpdates, handleProjectsRequest } from '../server/project-api.mjs';

const NOW = Date.parse('2026-10-27T00:00:00Z');
const NEXT = NOW + 16 * 60_000;
const DATE = '2026-10-26T12:00:00.000Z';
const NEW_DATE = '2026-10-27T12:00:00.000Z';
const request = () => new Request('https://portfolio.example/api/projects');
const markdown = '# Example\n\nA desktop application for synchronized footage review and trajectory exploration. Additional implementation detail stays in the full description.\n\n## Features\n- Review indexed analysis results.\n\n## Roadmap\n- Planned support for more platforms.\n';
const commit = (date = DATE, etag = '"commit-1"') => Response.json([{ sha: 'PRIVATE_INTERNAL_SHA', commit: { committer: { date }, message: 'PRIVATE_INTERNAL_MESSAGE' } }], { headers: { ETag: etag } });
const env = { GITHUB_TOKEN: 'SERVER_ONLY_TOKEN', PRIVATE_PROJECT_REPOS: JSON.stringify({ nexora: 'PrivateFixture' }) };
const file = { version: 1, publish: true, summary: 'An offline experiment-guidance prototype.', progressBrief: 'Prototype with reviewable session events.', status: 'Prototype' };

test('short summaries use the first suitable sentence and truncate on whole words', () => {
  const content = extractReadme(markdown, 'https://github.com/example/project#readme');
  assert.equal(content.summary, 'A desktop application for synchronized footage review and trajectory exploration.');
  assert.match(content.overview[0], /Additional implementation detail/);
  assert.doesNotMatch(JSON.stringify(content), /Planned support/);
  const long = 'A project that ' + 'describes useful engineering behavior '.repeat(10) + 'in detail.';
  const summary = summarizeOverview([long]);
  assert.ok(summary.length <= 240);
  assert.ok(summary.endsWith('…'));
  assert.ok(long.startsWith(summary.slice(0, -1) + ' '));
  assert.equal(summarizeOverview(['x'.repeat(300)]), '');
  assert.equal(summarizeOverview(['Updated on October 27, 2026 with documentation observations.', 'A useful project that organizes records and makes analysis easier.']), 'A useful project that organizes records and makes analysis easier.');
  const unsuitable = extractReadme('# Example\n\nA useful project that organizes records and makes analysis easier.\n\n## Features\n- Planned platform support is future work.\n- This will include a broader export workflow.\n- Review and filter indexed analysis records.\n', 'https://github.com/example/project#readme');
  assert.deepEqual(unsuitable.features, ['Review and filter indexed analysis records.']);
});

test('overview omits version/platform metadata and documentation audits while preserving substantive version descriptions', () => {
  const parsed = extractReadme(`# Example

Version: 1.0.0 | Platform: Windows 10/11 x64 | Java: 21 | License: GPL-3.0-or-later

Project version: 0.2.0. Documentation reviewed against the source on 25 October 2026. The earlier repository audit and implementation record are in AUDITREPORT.md and FIXSTATUS.md.

Documentation reviewed against the source on 25 October 2026.

The earlier repository audit records historical implementation observations.

A desktop application for reviewing footage and comparing synchronized analysis.

The application supports version 2 exports with indexed frames and recorded annotations.
`, 'https://github.com/example/project#readme');
  assert.deepEqual(parsed.overview, [
    'A desktop application for reviewing footage and comparing synchronized analysis.',
    'The application supports version 2 exports with indexed frames and recorded annotations.',
  ]);
  assert.equal(parsed.summary, parsed.overview[0]);
});

test('private publication requires exact opt-in fields, bounded plain text, and approved statuses', () => {
  assert.deepEqual(parsePublicSummary(JSON.stringify(file)), { summary: file.summary, progressBrief: file.progressBrief, status: 'Prototype' });
  for (const invalid of [
    { ...file, publish: false }, { ...file, version: 2 }, { ...file, source: 'private-code' },
    { ...file, summary: '' }, { ...file, summary: 'x'.repeat(281) }, { ...file, progressBrief: 'x'.repeat(161) },
    { ...file, summary: '<b>Private</b>' }, { ...file, summary: '[Source](https://example.com)' },
    { ...file, summary: 'See https://github.com/private/source' }, { ...file, summary: 'Two\nlines' },
    { ...file, status: 'Released' }, { ...file, screenshot: 'private.png' },
  ]) assert.equal(parsePublicSummary(JSON.stringify(invalid)), null, JSON.stringify(invalid));
  assert.equal(parsePublicSummary('{bad JSON'), null);
  assert.equal(parsePublicSummary(' '.repeat(4097)), null);
});

test('conditional refresh keeps descriptions on commit-only changes and updates them on README changes', async () => {
  const cache = new Map();
  const calls = [];
  let stage = 0;
  const fetchImpl = async (url, options) => {
    calls.push({ url, headers: options.headers, stage });
    if (url.endsWith('/readme')) {
      if (stage === 1) return new Response(null, { status: 304 });
      return new Response(stage === 2 ? markdown.replace('A desktop application', 'An updated desktop application') : markdown, { headers: { ETag: stage === 2 ? '"readme-2"' : '"readme-1"' } });
    }
    return commit(stage ? NEW_DATE : DATE, stage ? '"commit-2"' : '"commit-1"');
  };
  const first = await (await handleProjectsRequest(request(), { GITHUB_TOKEN: 'TOKEN' }, { now: NOW, cache, fetchImpl })).json();
  stage = 1;
  const second = await (await handleProjectsRequest(request(), { GITHUB_TOKEN: 'TOKEN' }, { now: NEXT, cache, fetchImpl })).json();
  const initial = first.projects.find(project => project.id === 'irc');
  const unchanged = second.projects.find(project => project.id === 'irc');
  assert.deepEqual(unchanged.readme, initial.readme);
  assert.equal(unchanged.lastCommitAt, NEW_DATE);
  assert.equal(unchanged.contentCheckedAt, new Date(NEXT).toISOString());
  assert.ok(calls.filter(call => call.stage === 1 && call.url.endsWith('/readme')).every(call => call.headers['If-None-Match'] === '"readme-1"'));
  assert.ok(calls.filter(call => call.stage === 1 && !call.url.endsWith('/readme')).every(call => call.headers['If-None-Match'] === '"commit-1"'));
  stage = 2;
  const third = await (await handleProjectsRequest(request(), { GITHUB_TOKEN: 'TOKEN' }, { now: NEXT + 16 * 60_000, cache, fetchImpl })).json();
  assert.match(third.projects.find(project => project.id === 'irc').readme.summary, /^An updated/);
  assert.doesNotMatch(JSON.stringify(third), /readme-1|commit-2|PRIVATE_INTERNAL|TOKEN|validators/);
  assert.ok([...cache.values()].some(entry => entry.validators.irc.content === '"readme-2"'));
});

test('private files publish approved text only and revert to reviewed text when removed or invalidated', async () => {
  const calls = [];
  const result = await fetchProjectUpdates(env, { now: NOW, fetchImpl: async url => {
    calls.push(url);
    if (url.includes('/PrivateFixture/contents/')) return Response.json(file);
    if (url.endsWith('/readme')) return new Response(markdown);
    return commit();
  } });
  const entry = result.projects.find(project => project.id === 'nexora');
  assert.deepEqual(entry.publicSummary, { summary: file.summary, progressBrief: file.progressBrief, status: 'Prototype' });
  assert.equal(entry.contentSource, 'approved-summary');
  assert.equal(entry.contentCheckedAt, new Date(NOW).toISOString());
  assert.ok(!calls.some(url => url.endsWith('/PrivateFixture/readme')));
  assert.doesNotMatch(JSON.stringify(result), /PrivateFixture|SERVER_ONLY|PRIVATE_INTERNAL|publish|version/);
  for (const response of [new Response('missing', { status: 404 }), new Response('{broken'), new Response(JSON.stringify({ ...file, publish: false })), new Response(JSON.stringify({ ...file, summary: 'x'.repeat(281) })), new Response('x'.repeat(4097))]) {
    const stale = await fetchProjectUpdates(env, { previous: result, now: NEXT, fetchImpl: async url => url.includes('/PrivateFixture/contents/') ? response : new Response('rate limit', { status: 429 }) });
    assert.deepEqual(stale.projects.find(project => project.id === 'nexora'), { id: 'nexora', lastCommitAt: DATE, commitState: 'known', publicSummary: null, contentSource: 'reviewed-fallback' });
    assert.equal(stale.generatedAt, result.generatedAt);
  }
  for (const status of [403, 429, 500]) {
    const failed = await fetchProjectUpdates(env, { previous: result, now: NEXT, fetchImpl: async () => new Response('Unavailable', { status }) });
    assert.deepEqual(failed.projects.find(project => project.id === 'nexora'), entry);
  }
});

test('failed checks never advance content freshness and missing READMEs leave reviewed fallback available', async () => {
  const first = await fetchProjectUpdates({}, { now: NOW, fetchImpl: async url => url.endsWith('/readme') ? new Response(markdown) : commit() });
  const failed = await fetchProjectUpdates({}, { now: NEXT, previous: first, fetchImpl: async () => new Response('rate limited', { status: 429 }) });
  assert.deepEqual(failed, first);
  const missing = await fetchProjectUpdates({}, { now: NEXT, previous: { projects: [] }, fetchImpl: async url => url.endsWith('/readme') ? new Response('missing', { status: 404 }) : commit() });
  assert.equal(missing.projects.find(project => project.id === 'irc').readme, undefined);
  assert.equal(missing.projects.find(project => project.id === 'irc').contentCheckedAt, undefined);
});

test('commit and approved-summary validators stay server-only and unchanged files are revalidated', async () => {
  const cache = new Map();
  let stage = 0;
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, headers: options.headers, stage });
    if (stage === 1) return new Response(null, { status: 304 });
    if (url.includes('/PrivateFixture/contents/')) return new Response(JSON.stringify(stage === 2 ? { ...file, summary: 'An updated, approved experiment-guidance prototype.' } : file), { headers: { ETag: '"approved-private-content"' } });
    if (url.endsWith('/readme')) return new Response(markdown, { headers: { ETag: '"readme"' } });
    return commit();
  };
  const first = await (await handleProjectsRequest(request(), env, { now: NOW, cache, fetchImpl })).json();
  stage = 1;
  const second = await (await handleProjectsRequest(request(), env, { now: NEXT, cache, fetchImpl })).json();
  assert.deepEqual(second.projects.find(p => p.id === 'nexora').publicSummary, first.projects.find(p => p.id === 'nexora').publicSummary);
  assert.equal(second.projects.find(p => p.id === 'nexora').contentCheckedAt, new Date(NEXT).toISOString());
  assert.equal(second.projects.find(p => p.id === 'nexora').lastCommitAt, DATE);
  assert.ok(calls.filter(call => call.stage === 1).every(call => call.headers['If-None-Match']));
  assert.equal(calls.find(call => call.stage === 1 && call.url.includes('/PrivateFixture/contents/')).headers['If-None-Match'], '"approved-private-content"');
  stage = 2;
  const third = await (await handleProjectsRequest(request(), env, { now: NEXT + 16 * 60_000, cache, fetchImpl })).json();
  assert.match(third.projects.find(p => p.id === 'nexora').publicSummary.summary, /^An updated, approved/);
  assert.doesNotMatch(JSON.stringify(third), /PrivateFixture|SERVER_ONLY|approved-private-content|PRIVATE_INTERNAL|validators/);
});
