import assert from 'node:assert/strict';
import test from 'node:test';
import snapshot from '../data/project-activity.json' with { type: 'json' };
import { projects, privateProjects, publicProjects } from '../data/projects.ts';
import { PUBLIC_README_INSIGHTS } from '../data/public-readme-insights.ts';
import { mergeProjectUpdates, formatCommitDate } from '../lib/project-activity.ts';

test('saved activity covers every project once with actual commit dates', () => {
  assert.equal(snapshot.projects.length, 30);
  assert.equal(new Set(snapshot.projects.map(project => project.id)).size, 30);
  assert.deepEqual(new Set(snapshot.projects.map(project => project.id)), new Set(projects.map(project => project.id)));
  const catalog = mergeProjectUpdates(projects, snapshot);
  assert.ok(catalog.every(project => project.lastCommitAt && project.commitState === 'known'));
  assert.ok(projects.every(project => project.progressBrief && project.progressBrief.length < 160));
  for (const row of snapshot.projects.filter(row => privateProjects.some(project => project.id === row.id))) {
    assert.deepEqual(Object.keys(row).sort(), ['commitState', 'id', 'lastCommitAt']);
  }
});

test('live updates replace dates and public documentation without exposing private details', () => {
  const catalog = mergeProjectUpdates(projects, snapshot);
  const payload = { projects: [
    { id: 'multigpu', lastCommitAt: '2026-10-26T00:00:00Z', commitState: 'known', readme: { overview: ['Fresh public documentation.'], features: ['A documented capability.'], progress: 'Fresh documented progress.', url: 'https://github.com/IchigoSolos69/MultiGPU#readme' } },
    { id: 'rarecomforts-commerce', lastCommitAt: '2026-10-26T01:00:00Z', commitState: 'known', repository: 'DO_NOT_EXPOSE', github: 'https://private.example', readme: { overview: ['PRIVATE_README'] }, description: 'PRIVATE_DESCRIPTION', progressBrief: 'UNAPPROVED_STATUS' },
    { id: 'unknown-project', lastCommitAt: '2026-10-26T00:00:00Z', commitState: 'known' },
  ] };
  const updated = mergeProjectUpdates(catalog, payload);
  assert.equal(updated.length, 30);
  const multi = updated.find(project => project.id === 'multigpu');
  assert.equal(multi?.lastCommitAt, '2026-10-26T00:00:00Z');
  assert.equal(multi?.progressBrief, 'Fresh documented progress.');
  assert.equal(multi?.source === 'public' && multi.readme?.overview[0], 'Fresh public documentation.');
  const secret = updated.find(project => project.id === 'rarecomforts-commerce');
  assert.equal(secret?.lastCommitAt, '2026-10-26T01:00:00Z');
  assert.doesNotMatch(JSON.stringify(secret), /DO_NOT_EXPOSE|PRIVATE_|private.example|UNAPPROVED/);
  const statusOnly = mergeProjectUpdates(catalog, { projects: [{ id: 'multigpu', readme: { overview: [], features: [], progress: 'A newly documented development stage.', url: 'https://github.com/IchigoSolos69/MultiGPU#readme' } }] });
  assert.equal(statusOnly.find(project => project.id === 'multigpu')?.progressBrief, 'A newly documented development stage.');
});

test('invalid updates and permission failures preserve the last successful field', () => {
  const catalog = mergeProjectUpdates(projects, snapshot);
  const original = catalog.find(project => project.id === 'multigpu');
  for (const payload of [null, {}, { projects: null }, { projects: [{ id: 'multigpu', lastCommitAt: 'bad', commitState: 'known' }] }, { projects: [{ id: 'multigpu', lastCommitAt: null, commitState: 'unavailable' }] }]) {
    assert.equal(mergeProjectUpdates(catalog, payload).find(project => project.id === 'multigpu')?.lastCommitAt, original?.lastCommitAt);
  }
  const updated = mergeProjectUpdates(catalog, { projects: [{ id: 'multigpu', lastCommitAt: null, commitState: 'empty' }] });
  assert.equal(formatCommitDate(updated.find(project => project.id === 'multigpu')!), 'No commits yet');
  assert.equal(formatCommitDate({ lastCommitAt: null }), 'Date unavailable');
  assert.equal(formatCommitDate({ lastCommitAt: '2026-10-24T20:00:00Z', commitState: 'known' }), '25 Oct 2026');
});

test('public descriptions are reviewed, substantive, and keep documented limitations', () => {
  assert.equal(Object.keys(PUBLIC_README_INSIGHTS).length, 18);
  assert.ok(publicProjects.every(project => project.description.length > 300 && project.highlights.length >= 3 && project.progressBrief));
  assert.match(publicProjects.find(project => project.id === 'neural-world-model')?.description || '', /three moving discs/);
  assert.match(publicProjects.find(project => project.id === 'tt-trajectory-engine')?.limitations?.join(' ') || '', /no CPU fallback/);
});
