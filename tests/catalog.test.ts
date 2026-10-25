import assert from 'node:assert/strict';
import test from 'node:test';
import snapshot from '../data/repositories.json' with { type: 'json' };
import { projects } from '../data/projects.ts';
import { filterProjects, getPublishableProjects } from '../lib/catalog.ts';
import type { Project } from '../types.ts';

const all = { query: '', category: 'All', technology: 'All' };

test('every saved public repository appears once, with unique ids and valid source links', () => {
  assert.ok(snapshot.repositories.length >= 18);
  assert.equal(projects.length, snapshot.repositories.length);
  assert.equal(new Set(projects.map(project => project.id)).size, projects.length);
  assert.equal(new Set(projects.map(project => project.repository)).size, projects.length);
  assert.equal(projects.filter(project => project.featured).length, 4);
  for (const project of projects) {
    assert.equal(project.source, 'public');
    assert.equal(project.github, `https://github.com/${project.repository}`);
    assert.ok(project.title && project.summary && project.description);
  }
});

test('query is case-insensitive and combines with category and technology filters', () => {
  assert.equal(filterProjects(projects, all).length, projects.length);
  assert.deepEqual(filterProjects(projects, { query: '  campus  ', category: 'Applications', technology: 'TypeScript' })
    .map(project => project.id), ['fixmycampus']);
  assert.equal(filterProjects(projects, { query: 'campus', category: 'Foundations', technology: 'All' }).length, 0);
  assert.equal(filterProjects(projects, { ...all, query: 'does-not-exist-in-any-project' }).length, 0);
  assert.ok(filterProjects(projects, { ...all, query: 'pYqT5' }).some(project => project.id === 'inventory-management-system'));
  assert.ok(filterProjects(projects, { ...all, query: 'Computer-Guesses-your-the-Number' })
    .some(project => project.id === 'computer-guesses-your-the-number'));
});

test('private drafts never enter the archive until explicitly approved', () => {
  const privateDraft: Project = { ...projects[0], id: 'private-draft', source: 'private', approved: false };
  assert.equal(getPublishableProjects([privateDraft]).length, 0);
  assert.equal(filterProjects([privateDraft], all).length, 0);
  assert.equal(getPublishableProjects([{ ...privateDraft, approved: undefined }]).length, 0);
  assert.equal(getPublishableProjects([{ ...privateDraft, approved: true }]).length, 1);
});

test('known project limitations and corrected stack remain in curated copy', () => {
  const inventory = projects.find(project => project.id === 'inventory-management-system');
  const training = projects.find(project => project.id === 'multigpu');
  const world = projects.find(project => project.id === 'neural-world-model');
  assert.ok(inventory?.tags.includes('Python'));
  assert.ok(!inventory?.tags.includes('Java'));
  assert.match(training?.description ?? '', /one resource/);
  assert.equal(world?.status, 'Research prototype');
});
