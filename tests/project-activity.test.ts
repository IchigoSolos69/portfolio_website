import assert from 'node:assert/strict';
import test from 'node:test';
import snapshot from '../data/project-activity.json' with { type: 'json' };
import { projects, privateProjects, publicProjects } from '../data/projects.ts';
import { PUBLIC_README_INSIGHTS } from '../data/public-readme-insights.ts';
import { mergeProjectUpdates, formatCommitDate } from '../lib/project-activity.ts';
import { filterProjects } from '../lib/catalog.ts';

test('saved activity covers every project once with actual commit dates', () => {
  assert.equal(snapshot.projects.length, projects.length);
  assert.equal(new Set(snapshot.projects.map(project => project.id)).size, projects.length);
  assert.deepEqual(new Set(snapshot.projects.map(project => project.id)), new Set(projects.map(project => project.id)));
  const catalog = mergeProjectUpdates(projects, snapshot);
  assert.ok(catalog.every(project => project.lastCommitAt && project.commitState === 'known'));
  assert.ok(projects.filter(project => project.source === 'private' || PUBLIC_README_INSIGHTS[project.repository?.split('/')[1] || '']).every(project => project.progressBrief && project.progressBrief.length < 160));
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
  assert.equal(updated.length, projects.length);
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
  assert.ok(publicProjects.filter(project => PUBLIC_README_INSIGHTS[project.repository?.split('/')[1] || '']).every(project => project.description.length > 300 && project.highlights.length >= 3 && project.progressBrief));
  assert.match(publicProjects.find(project => project.id === 'neural-world-model')?.description || '', /three moving discs/);
  assert.match(publicProjects.find(project => project.id === 'tt-trajectory-engine')?.limitations?.join(' ') || '', /no CPU fallback/);
});

test('README content updates the shared card, dialog, feature, and search model', () => {
  const contentCheckedAt = '2026-10-27T09:30:00Z';
  const catalog = mergeProjectUpdates(projects, { projects: [{ id: 'multigpu', contentSource: 'readme', contentCheckedAt,
    readme: { summary: 'A newly documented recovery workspace.', overview: ['A newly documented recovery workspace.', 'A longer description explains the current workflow.'], features: ['Review a saved sample checkpoint.'], url: 'https://github.com/IchigoSolos69/MultiGPU#readme' } }] });
  const project = catalog.find(project => project.id === 'multigpu');
  assert.equal(project?.summary, 'A newly documented recovery workspace.');
  assert.equal(project?.source === 'public' && project.description, 'A newly documented recovery workspace.\n\nA longer description explains the current workflow.');
  assert.deepEqual(project?.source === 'public' && project.highlights, ['Review a saved sample checkpoint.']);
  assert.equal(project?.contentSource, 'readme');
  assert.equal(project?.contentCheckedAt, contentCheckedAt);
  assert.equal(filterProjects(catalog, { query: 'newly documented', category: 'All', technology: 'All' })[0]?.id, 'multigpu');
  const failed = mergeProjectUpdates(catalog, { projects: [{ id: 'multigpu', contentCheckedAt: '2026-10-28T00:00:00Z' }] });
  assert.equal(failed.find(project => project.id === 'multigpu')?.contentCheckedAt, contentCheckedAt);
  assert.equal(project?.source === 'public' && project.caseStudy, publicProjects.find(project => project.id === 'multigpu')?.caseStudy);
});

test('only explicitly approved private summary fields can replace reviewed text', () => {
  const contentCheckedAt = '2026-10-27T09:30:00Z';
  const row = { id: 'rarecomforts-commerce', contentSource: 'approved-summary', contentCheckedAt,
    publicSummary: { summary: 'A customer storefront with order tracking.', progressBrief: 'Storefront prototype under review.', status: 'Prototype' } };
  const catalog = mergeProjectUpdates(projects, { projects: [row] });
  const project = catalog.find(project => project.id === row.id)!;
  assert.equal(project.summary, row.publicSummary.summary);
  assert.equal(project.progressBrief, row.publicSummary.progressBrief);
  assert.equal(project.status, 'Prototype');
  assert.equal(project.contentSource, 'approved-summary');
  assert.equal(project.contentCheckedAt, contentCheckedAt);
  assert.equal(filterProjects(catalog, { query: 'order tracking', category: 'Private work', technology: 'All' })[0]?.id, row.id);
  assert.ok(!Object.hasOwn(project, 'readme') && !Object.hasOwn(project, 'publicSummary') && !Object.hasOwn(project, 'description'));
  const withdrawn = mergeProjectUpdates(catalog, { projects: [{ id: row.id, contentSource: 'reviewed-fallback', publicSummary: null }] }, projects).find(item => item.id === row.id)!;
  const reviewed = privateProjects.find(item => item.id === row.id)!;
  assert.equal(withdrawn.summary, reviewed.summary);
  assert.equal(withdrawn.progressBrief, reviewed.progressBrief);
  assert.equal(withdrawn.status, reviewed.status);
  assert.equal(withdrawn.contentSource, 'reviewed-fallback');
  assert.equal(withdrawn.contentCheckedAt, undefined);
  for (const publicSummary of [
    { summary: 'x'.repeat(281) }, { summary: 'See https://private.example' }, { summary: '<script>private details</script>' },
    { summary: 'A brief approved description.', repository: 'DO_NOT_EXPOSE' }, { summary: 'A brief approved description.', progressBrief: 'x'.repeat(161) },
    { summary: 'A brief approved description.', status: 'SECRET_STATUS' },
  ]) {
    const result = mergeProjectUpdates(catalog, { projects: [{ ...row, publicSummary, contentCheckedAt: '2026-10-28T00:00:00Z' }] }).find(item => item.id === row.id)!;
    assert.equal(result.summary, project.summary);
    assert.equal(result.contentCheckedAt, contentCheckedAt);
    assert.doesNotMatch(JSON.stringify(result), /DO_NOT_EXPOSE|SECRET_STATUS|private.example|<script>/);
  }
  for (const extra of [{ contentSource: 'readme' }, { contentCheckedAt: 'invalid' }]) {
    assert.equal(mergeProjectUpdates(projects, { projects: [{ ...row, ...extra }] }).find(item => item.id === row.id)?.summary,
      privateProjects.find(item => item.id === row.id)?.summary);
  }
});
