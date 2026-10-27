import assert from 'node:assert/strict';
import test from 'node:test';
import { projects } from '../data/projects.ts';
import { readPortfolioLocation, portfolioHref } from '../lib/portfolio-navigation.ts';

test('public project links support demo views without enabling private or unknown dialogs', () => {
  const state = readPortfolioLocation('https://example.test/?project=tt-trajectory-engine&view=demo', projects);
  assert.equal(state.projectId, 'tt-trajectory-engine');
  assert.equal(state.view, 'demo');
  for (const id of ['rarecomforts-commerce', 'does-not-exist']) {
    const next = readPortfolioLocation(`https://example.test/?project=${id}&view=demo`, projects);
    assert.equal(next.projectId, null);
    assert.equal(next.view, 'overview');
  }
});

test('archive filters round-trip with project links, hash anchors, and unrelated parameters', () => {
  const state = readPortfolioLocation('https://example.test/?q=campus&category=Applications&technology=TypeScript&project=fixmycampus&view=demo#archive', projects);
  const href = portfolioHref('https://example.test/?utm_source=referral#archive', state);
  const url = new URL(href, 'https://example.test');
  assert.equal(url.searchParams.get('utm_source'), 'referral');
  assert.equal(url.hash, '#archive');
  assert.deepEqual(readPortfolioLocation(url.href, projects), state);
  const closed = new URL(portfolioHref(url.href, { ...state, projectId: null, view: 'overview', query: '', category: 'All', technology: 'All' }), url);
  assert.equal(closed.search, '?utm_source=referral');
  const invalid = readPortfolioLocation('https://example.test/?category=invalid&technology=invalid', projects);
  assert.equal(invalid.category, 'All');
  assert.equal(invalid.technology, 'All');
});
