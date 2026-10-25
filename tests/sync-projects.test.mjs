import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { fetchPublicRepositories, OWNER, syncProjects } from '../scripts/sync-projects-lib.mjs';

function row(id, name, extra = {}) {
  return { id, name, owner: { login: OWNER }, private: false, visibility: 'public', default_branch: 'main', ...extra };
}
const response = rows => ({ ok: true, json: async () => rows });

async function temporaryDirectory() {
  const parent = fileURLToPath(new URL('../node_modules/.cache/', import.meta.url));
  await mkdir(parent, { recursive: true });
  return mkdtemp(join(parent, 'ink-steel-catalog-'));
}

test('refresh follows pagination and writes only allowlisted public metadata', async () => {
  const requests = [];
  const firstPage = Array.from({ length: 100 }, (_, i) => row(i + 1, `project-${i}`));
  const repositories = await fetchPublicRepositories(async url => {
    requests.push(url);
    return requests.length === 1 ? response(firstPage) : response([
      row(101, 'public-final', { secretField: 'must-not-copy' }),
      row(102, 'private-project', { private: true, visibility: 'private' }),
      row(103, 'other-owner', { owner: { login: 'someone-else' } }),
    ]);
  });
  assert.equal(requests.length, 2);
  assert.match(requests[1], /page=2$/);
  assert.equal(repositories.length, 101);
  assert.ok(!JSON.stringify(repositories).includes('must-not-copy'));
  assert.ok(!JSON.stringify(repositories).includes('private-project'));
  assert.ok(!JSON.stringify(repositories).includes('other-owner'));
});

test('failed or partial refresh preserves the last successful catalog byte-for-byte', async t => {
  const directory = await temporaryDirectory();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const outputPath = join(directory, 'repositories.json');
  const original = '{"lastSuccessful":"untouched"}\n';
  await writeFile(outputPath, original);
  let calls = 0;
  const result = await syncProjects({ outputPath, fetchImpl: async () => {
    calls += 1;
    if (calls === 1) return response(Array.from({ length: 100 }, (_, i) => row(i + 1, `project-${i}`)));
    throw new Error('Network unavailable');
  } });
  assert.equal(result.updated, false);
  assert.equal(await readFile(outputPath, 'utf8'), original);
});

test('successful refresh saves a complete usable snapshot and malformed data cannot replace it', async t => {
  const directory = await temporaryDirectory();
  t.after(() => rm(directory, { recursive: true, force: true }));
  const outputPath = join(directory, 'repositories.json');
  const result = await syncProjects({ outputPath, fetchImpl: async () => response([row(1, 'sample')]) });
  assert.equal(result.updated, true);
  const saved = await readFile(outputPath, 'utf8');
  assert.equal(JSON.parse(saved).repositories[0].fullName, `${OWNER}/sample`);
  const invalid = await syncProjects({ outputPath, fetchImpl: async () => response([row(1, '../unsafe')]) });
  assert.equal(invalid.updated, false);
  assert.equal(await readFile(outputPath, 'utf8'), saved);
});
