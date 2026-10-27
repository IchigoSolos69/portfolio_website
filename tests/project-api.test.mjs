import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { extractReadme, fetchProjectUpdates, handleProjectsRequest } from '../server/project-api.mjs';

const PUBLIC_COUNT = JSON.parse(readFileSync(new URL('../data/repositories.json', import.meta.url), 'utf8')).repositories.length;
const UPSTREAM_REQUESTS = PUBLIC_COUNT * 2;
const DATE = '2026-10-24T12:34:56.000Z';
const NOW = Date.parse('2026-10-25T00:00:00.000Z');
const request = () => new Request('https://portfolio.example/api/projects');
const commit = () => Response.json([{ commit: { committer: { date: DATE }, author: { date: '2001-01-01T00:00:00Z' }, message: 'Do not publish this message' }, sha: 'not-public-output' }]);
const readme = '# Example\n\nA documented desktop application with useful analysis and review tools.\n\n## Features\n- Review synchronized analysis and video.\n- Export selected records for later review.\n\n## Roadmap\n- Planned functionality is not a completed feature.\n\n## Current status\nA working prototype with hardware validation still pending.\n\n## Installation\nSECRET_INSTALL_INSTRUCTION\n';
const upstream = async url => url.endsWith('/readme') ? new Response(readme) : commit();

test('README excerpts keep readable content and do not turn roadmap or setup into features', () => {
  const result = extractReadme(readme, 'https://github.com/example/project#readme');
  assert.deepEqual(result.overview, ['A documented desktop application with useful analysis and review tools.']);
  assert.deepEqual(result.features, ['Review synchronized analysis and video.', 'Export selected records for later review.']);
  assert.match(result.progress, /hardware validation still pending/);
  assert.doesNotMatch(JSON.stringify(result), /SECRET|Planned functionality/);
  const sanitized = extractReadme('# Test\n\n<script>doBadThings()</script>\n\nA **readable** [description](javascript:alert) with no embedded executable markup.\n\n```html\n<script>hidden()</script>\n```', 'https://github.com/example/project#readme');
  assert.match(sanitized.overview[0], /A readable description/);
  assert.doesNotMatch(JSON.stringify(sanitized), /<script|javascript:|doBadThings|hidden/);
});

test('public commit dates use committer time and public READMEs, never commit messages', async () => {
  const calls = [];
  const result = await fetchProjectUpdates({}, { now: NOW, fetchImpl: async (url, options) => { calls.push({ url, options }); return upstream(url); } });
  assert.equal(result.projects.length, PUBLIC_COUNT + 12);
  const publicEntries = result.projects.filter(project => project.readme);
  assert.equal(publicEntries.length, PUBLIC_COUNT);
  for (const project of publicEntries) {
    assert.equal(project.lastCommitAt, DATE);
    assert.equal(project.commitState, 'known');
    assert.match(project.readme.url, /^https:\/\/github\.com\/IchigoSolos69\/.+#readme$/);
  }
  assert.equal(calls.length, UPSTREAM_REQUESTS);
  assert.ok(calls.every(call => !call.options.headers.Authorization));
  assert.doesNotMatch(JSON.stringify(result), /not-public-output|Do not publish this message|2001-01-01/);
});

test('private aliases are allowlisted and cannot publish arbitrary private content', async () => {
  const env = {
    GITHUB_TOKEN: 'test-server-token',
    PRIVATE_PROJECT_REPOS: JSON.stringify({ 'rarecomforts-commerce': 'PrivateFixture', unknown: 'DoNotFetch', nexora: '../Traversal' }),
  };
  const calls = [];
  const previous = { projects: [{ id: 'rarecomforts-commerce', lastCommitAt: DATE, commitState: 'known', readme: { overview: ['PRIVATE_SECRET'], features: [] }, repository: 'PrivateFixture' }] };
  const result = await fetchProjectUpdates(env, { now: NOW, previous, fetchImpl: async (url, options) => { calls.push({ url, options }); return upstream(url); } });
  assert.equal(calls.filter(call => call.url.includes('PrivateFixture')).length, 2);
  assert.ok(calls.some(call => call.url.endsWith('/PrivateFixture/commits?per_page=1')));
  assert.ok(calls.some(call => call.url.endsWith('/PrivateFixture/contents/portfolio.public.json')));
  assert.ok(calls.every(call => !call.url.endsWith('/PrivateFixture/readme')));
  assert.ok(calls.every(call => call.options.headers.Authorization === 'Bearer test-server-token'));
  assert.ok(calls.every(call => !/DoNotFetch|Traversal/.test(call.url)));
  assert.deepEqual(result.projects.find(project => project.id === 'rarecomforts-commerce'), { id: 'rarecomforts-commerce', lastCommitAt: DATE, commitState: 'known', publicSummary: null, contentSource: 'reviewed-fallback' });
  assert.doesNotMatch(JSON.stringify(result), /PRIVATE_SECRET|PrivateFixture|test-server-token|repository/);
  calls.length = 0;
  await fetchProjectUpdates({ PRIVATE_PROJECT_REPOS: env.PRIVATE_PROJECT_REPOS }, { now: NOW, fetchImpl: async url => { calls.push(url); return upstream(url); } });
  assert.ok(calls.every(url => !url.includes('PrivateFixture')));
});

test('empty repositories differ from permission errors, and failures preserve last successful data', async () => {
  const previous = { projects: [
    { id: 'irc', lastCommitAt: DATE, commitState: 'known', readme: { overview: ['Previously verified README overview for the desktop project.'], features: [] } },
    { id: 'multigpu', lastCommitAt: DATE, commitState: 'known' },
    { id: 'nexora', lastCommitAt: DATE, commitState: 'known' },
  ] };
  const result = await fetchProjectUpdates({ GITHUB_TOKEN: 'test', PRIVATE_PROJECT_REPOS: '{"nexora":"PrivateFixture"}' }, { now: NOW, previous, fetchImpl: async url => {
    if (url.includes('/IRC/commits')) return new Response('{}', { status: 409 });
    if (url.includes('/MultiGPU/commits')) return new Response('invalid json');
    return new Response('Sensitive upstream error body', { status: 404 });
  } });
  assert.equal(result.projects.find(project => project.id === 'irc').commitState, 'empty');
  assert.equal(result.projects.find(project => project.id === 'irc').lastCommitAt, null);
  assert.equal(result.projects.find(project => project.id === 'irc').readme.overview[0], previous.projects[0].readme.overview[0]);
  assert.equal(result.projects.find(project => project.id === 'multigpu').lastCommitAt, DATE);
  assert.equal(result.projects.find(project => project.id === 'nexora').lastCommitAt, DATE);
  assert.doesNotMatch(JSON.stringify(result), /Sensitive upstream/);
});

test('API caches hourly without a token and refresh failures retain the successful catalog', async () => {
  const cache = new Map();
  let count = 0;
  let fail = false;
  const fetchImpl = async url => { count++; if (fail) throw new Error('network offline'); return upstream(url); };
  const first = await handleProjectsRequest(request(), {}, { now: NOW, cache, fetchImpl });
  assert.equal(first.status, 200);
  assert.match(first.headers.get('Cache-Control'), /max-age=60/);
  assert.equal(count, UPSTREAM_REQUESTS);
  await handleProjectsRequest(request(), {}, { now: NOW + 59 * 60 * 1000, cache, fetchImpl });
  assert.equal(count, UPSTREAM_REQUESTS);
  fail = true;
  const refreshed = await (await handleProjectsRequest(request(), {}, { now: NOW + 61 * 60 * 1000, cache, fetchImpl })).json();
  assert.equal(count, UPSTREAM_REQUESTS * 2);
  assert.equal(refreshed.projects.find(project => project.id === 'irc').lastCommitAt, DATE);
  assert.ok(refreshed.projects.find(project => project.id === 'irc').readme);
});

test('authenticated refresh interval is fifteen minutes and concurrent requests share one refresh', async () => {
  const cache = new Map();
  let count = 0;
  const fetchImpl = async url => { count++; return upstream(url); };
  const env = { GITHUB_TOKEN: 'test' };
  await Promise.all([handleProjectsRequest(request(), env, { now: NOW, cache, fetchImpl }), handleProjectsRequest(request(), env, { now: NOW, cache, fetchImpl })]);
  assert.equal(count, UPSTREAM_REQUESTS);
  await handleProjectsRequest(request(), env, { now: NOW + 14 * 60 * 1000, cache, fetchImpl });
  assert.equal(count, UPSTREAM_REQUESTS);
  await handleProjectsRequest(request(), env, { now: NOW + 16 * 60 * 1000, cache, fetchImpl });
  assert.equal(count, UPSTREAM_REQUESTS * 2);
  const rejected = await handleProjectsRequest(new Request('https://portfolio.example/api/projects', { method: 'POST' }), env, { cache, fetchImpl });
  assert.equal(rejected.status, 405);
  assert.equal(rejected.headers.get('Allow'), 'GET');
  assert.equal(count, UPSTREAM_REQUESTS * 2);
});

test('oversized READMEs cannot displace safe fallback or block valid dates', async () => {
  const result = await fetchProjectUpdates({}, { now: NOW, previous: { projects: [] }, fetchImpl: async url => url.endsWith('/readme') ? new Response('x'.repeat(65537)) : commit() });
  assert.equal(result.projects.find(project => project.id === 'irc').lastCommitAt, DATE);
  assert.equal(result.projects.find(project => project.id === 'irc').readme, undefined);
});


test('edge-cache entries retain stale data independently of the refresh interval', async () => {
  const entries = new Map();
  const cache = {
    async match(key) { return entries.get(key.url)?.clone(); },
    async put(key, response) { entries.set(key.url, response.clone()); },
  };
  let count = 0;
  let fail = false;
  const fetchImpl = async url => { count++; return fail ? new Response('rate limited', { status: 429 }) : upstream(url); };
  await handleProjectsRequest(request(), { GITHUB_TOKEN: 'test' }, { now: NOW, cache, fetchImpl });
  const entry = [...entries.values()][0];
  assert.equal(entry.headers.get('Cache-Control'), 'public, max-age=604800');
  fail = true;
  const result = await (await handleProjectsRequest(request(), { GITHUB_TOKEN: 'test' }, { now: NOW + 16 * 60 * 1000, cache, fetchImpl })).json();
  assert.equal(count, UPSTREAM_REQUESTS * 2);
  assert.equal(result.projects.find(project => project.id === 'irc').lastCommitAt, DATE);
  assert.ok(result.projects.find(project => project.id === 'irc').readme);
});

test('GitHub work is limited to four simultaneous requests', async () => {
  let active = 0;
  let maximum = 0;
  await fetchProjectUpdates({}, { now: NOW, fetchImpl: async url => {
    active++;
    maximum = Math.max(maximum, active);
    await new Promise(resolve => setImmediate(resolve));
    active--;
    return upstream(url);
  } });
  assert.equal(maximum, 4);
});

test('research progress selects the actual experiment stage instead of audit dates and check counts', () => {
  const result = extractReadme(`# Neural World Model

A research prototype comparing learned recurrent dynamics with fitted physics and learned residual physics.

## Current status and verified evidence

**Checked on October 25, 2026.** These observations describe the development machine and saved artifacts. Generated datasets and checkpoints are not supplied by a fresh source checkout.

| Area | Verified state |
| --- | --- |
| Synthetic smoke pipeline | Generation and evaluation completed. Models are deliberately undertrained. |
| Serving parity | All ten predictors matched one source example. This checks export fidelity, not prediction quality. |
| Recorded Python checks | October 19: 134 passed, four CUDA checks skipped. These are historical results. |
| Full experiment | **Interrupted**: supervisor and child are no longer alive. The last saved training log ends at hybrid_2 epoch **34/45**. Checkpoints remain; full evaluation and publication have not finished. |
| Real-video track | Large-model inference and hardware feasibility remain unverified. |

The smoke comparison was -0.06524 px, with a confidence interval that does not distinguish the predictors. This does not support a research performance claim.

This documentation update does not resume training or start cloud compute.
`, 'https://github.com/example/project#readme');
  assert.match(result.progress, /^Full experiment: Interrupted/);
  assert.match(result.progress, /34\/45/);
  assert.match(result.progress, /evaluation and publication have not finished/);
  assert.doesNotMatch(result.progress, /Checked on|134 passed|0\.06524|Serving parity|superior/i);
});

test('overview excludes installation and documentation preambles mixed into the README introduction', () => {
  const result = extractReadme(`# FamGPSlink

A family location app for Android and iPhone with native background collectors and a shared Flutter interface.

Implemented: owner-approved profiles, opt-in sharing, encrypted offline buffering, and family map views.

The local native configs now connect to the project. Install the local debug APK and use Family owner sign-in with your chosen password. A build without native Firebase configs displays a setup screen.

Updated on October 25, 2026. This documentation update records the development environment.

## Requirements and local builds

Install the required SDK before building.
`, 'https://github.com/example/project#readme');
  assert.equal(result.overview.length, 2);
  assert.match(result.overview[1], /opt-in sharing/);
  assert.doesNotMatch(result.overview.join(' '), /local native configs|Install|password|Updated on|documentation update|SDK/);
});
