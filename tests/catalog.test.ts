import assert from 'node:assert/strict';
import test from 'node:test';
import snapshot from '../data/repositories.json' with { type: 'json' };
import { projects, publicProjects, privateProjects, featuredProjects } from '../data/projects.ts';
import { filterProjects, projectCategory, projectTags } from '../lib/catalog.ts';

const all = { query: '', category: 'All', technology: 'All' };

test('every public repository appears once alongside twelve summary-only private entries', () => {
  assert.ok(snapshot.repositories.length >= 18);
  assert.equal(publicProjects.length, snapshot.repositories.length);
  assert.equal(privateProjects.length, 12);
  assert.equal(projects.length, publicProjects.length + privateProjects.length);
  assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
  assert.equal(new Set(publicProjects.map(project => project.repository)).size, publicProjects.length);
  for (const project of publicProjects) {
    assert.equal(project.source, 'public');
    assert.equal(project.github, `https://github.com/${project.repository}`);
    assert.ok(project.title && project.summary && project.description);
  }
});

test('selected work follows the six-project editorial order from the catalog', () => {
  assert.deepEqual(featuredProjects.map(project => project.id), [
    'rarecomforts-commerce', 'tt-trajectory-engine', 'creator-partnerships',
    'nexora', 'autonomous-driving-prediction', 'multigpu',
  ]);
  assert.deepEqual(featuredProjects.map(project => project.featuredOrder), [1, 2, 3, 4, 5, 6]);
  assert.equal(publicProjects.find(project => project.id === 'fixmycampus')?.featuredOrder, undefined);
  assert.equal(publicProjects.find(project => project.id === 'famgpslink')?.featuredOrder, undefined);
  assert.equal(publicProjects.find(project => project.id === 'tt-trajectory-engine')?.media?.src,
    '/assets/projects/tt-analysis.png');
});

test('private entries contain only authorized display and presentation fields', () => {
  const allowed = new Set(['id', 'title', 'summary', 'status', 'source', 'illustration', 'featuredOrder', 'progressBrief', 'lastCommitAt', 'commitState']);
  for (const project of privateProjects) {
    assert.equal(project.source, 'private');
    assert.ok(project.id && project.title && project.summary);
    assert.ok(Object.keys(project).every(key => allowed.has(key)), project.id);
    for (const field of ['repository', 'github', 'demo', 'media', 'description', 'highlights', 'tags', 'category']) {
      assert.equal(Object.hasOwn(project, field), false, `${project.id} exposes ${field}`);
    }
    assert.doesNotMatch(JSON.stringify(project), /https?:\/\/|github\.com|postgres(?:ql)?:\/\//i);
    assert.equal(projectCategory(project), 'Private work');
    assert.deepEqual(projectTags(project), []);
  }
});

test('query is case-insensitive and combines with public category and technology filters', () => {
  assert.equal(filterProjects(projects, all).length, projects.length);
  assert.deepEqual(filterProjects(projects, { query: '  campus  ', category: 'Applications', technology: 'TypeScript' })
    .map(project => project.id), ['fixmycampus']);
  assert.equal(filterProjects(projects, { query: 'campus', category: 'Foundations', technology: 'All' }).length, 0);
  assert.equal(filterProjects(projects, { ...all, query: 'does-not-exist-in-any-project' }).length, 0);
  assert.ok(filterProjects(projects, { ...all, query: 'pYqT5' }).some(project => project.id === 'inventory-management-system'));
  assert.ok(filterProjects(projects, { ...all, query: 'Computer-Guesses-your-the-Number' })
    .some(project => project.id === 'computer-guesses-your-the-number'));
});

test('private summaries are searchable without leaking into technology-specific results', () => {
  assert.equal(filterProjects(projects, { ...all, category: 'Private work' }).length, 12);
  assert.deepEqual(filterProjects(projects, { ...all, category: 'Private work', query: 'spoken guidance' })
    .map(project => project.id), ['nexora']);
  assert.deepEqual(filterProjects(projects, { ...all, query: 'rarecomforts-commerce' })
    .map(project => project.id), ['rarecomforts-commerce']);
  assert.equal(filterProjects(projects, { ...all, category: 'Private work', technology: 'Python' }).length, 0);
  assert.ok(filterProjects(projects, { ...all, technology: 'Python' }).every(project => project.source === 'public'));
});

test('known limitations, corrected stacks, and private concept labels remain honest', () => {
  const inventory = publicProjects.find(project => project.id === 'inventory-management-system');
  const training = publicProjects.find(project => project.id === 'multigpu');
  const world = publicProjects.find(project => project.id === 'neural-world-model');
  assert.ok(inventory?.tags.includes('Python'));
  assert.ok(!inventory?.tags.includes('Java'));
  assert.match(training?.description ?? '', /one resource/);
  assert.equal(world?.status, 'Research prototype');
  assert.equal(privateProjects.find(project => project.id === 'nexora')?.status, 'Prototype');
  assert.equal(privateProjects.find(project => project.id === 'calories-calculator')?.status, 'Concept');
  assert.equal(privateProjects.find(project => project.id === 'public-issue-reporting')?.status, 'Concept');
  assert.match(privateProjects.find(project => project.id === 'sort2save')?.summary ?? '', /classification/);
  assert.match(privateProjects.find(project => project.id === 'cinema-experience')?.summary ?? '', /home-cinema concept/);
  assert.match(privateProjects.find(project => project.id === 'support-ticket-monitor')?.summary ?? '', /simulation mode/);
});
