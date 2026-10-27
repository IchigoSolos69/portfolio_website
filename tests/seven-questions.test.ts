import assert from 'node:assert/strict';
import test from 'node:test';
import { binaryCard, gameReducer, gameResult, newGame, type GameState } from '../lib/seven-questions.ts';

function answerNumber(number: number) {
  let state = gameReducer(newGame(), { type: 'start' });
  for (let question = 0; question < 7; question++) state = gameReducer(state, { type: 'answer', question, answer: binaryCard(question).includes(number) });
  return state;
}

test('a complete game correctly reveals every number from one through one hundred', () => {
  for (let number = 1; number <= 100; number++) assert.equal(gameResult(answerNumber(number).answers), number);
});

test('stale rapid answer actions cannot answer the next card or go beyond seven', () => {
  const first = gameReducer(newGame(true), { type: 'answer', question: 0, answer: true });
  assert.equal(gameReducer(first, { type: 'answer', question: 0, answer: false }), first);
  const finished = answerNumber(42);
  assert.equal(gameReducer(finished, { type: 'answer', question: 7, answer: true }), finished);
  assert.equal(finished.answers.length, 7);
  const notStarted = newGame();
  assert.equal(gameReducer(notStarted, { type: 'answer', question: 0, answer: true }), notStarted);
});

test('undo lets an answer be corrected and restart removes all previous answers', () => {
  let state: GameState = answerNumber(42);
  state = gameReducer(state, { type: 'undo' });
  assert.equal(state.answers.length, 6);
  assert.equal(state.direction, 'back');
  assert.equal(gameResult(state.answers), null);
  state = gameReducer(state, { type: 'answer', question: 6, answer: false });
  assert.equal(gameResult(state.answers), 42);
  state = gameReducer(state, { type: 'restart' });
  assert.deepEqual(state.answers, []);
  assert.equal(state.started, true);
  assert.equal(gameReducer(state, { type: 'undo' }), state);
});

test('incomplete and inconsistent answers never reveal a number outside the promised range', () => {
  assert.equal(gameResult([true]), null);
  assert.equal(gameResult(Array(7).fill(false)), null);
  for (let value = 101; value <= 127; value++) assert.equal(gameResult(Array.from({ length: 7 }, (_, bit) => Boolean(value & (1 << bit)))), null);
});
