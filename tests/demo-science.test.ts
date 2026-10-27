import assert from 'node:assert/strict';
import test from 'node:test';
import { illustrativeFlight, trainingTransition, INITIAL_TRAINING, trafficActors, FUTURES, discForecast, advanceCampus, canViewLocation } from '../lib/demo-science.ts';

test('educational flight is deterministic, bounded above its floor, and includes a bounce', () => {
  const flight = illustrativeFlight(24, 0);
  assert.equal(flight.length, 91);
  assert.deepEqual(flight, illustrativeFlight(24, 0));
  assert.ok(flight.every(point => Number.isFinite(point.x) && point.y >= 0));
  assert.ok(flight.some(point => point.bounced));
  assert.ok(flight.every((point, index) => index === 0 || point.x > flight[index - 1].x));
  assert.notDeepEqual(illustrativeFlight(24, -1), illustrativeFlight(24, 1));
});

test('checkpoint recovery discards unsaved steps and uses one fallback resource', () => {
  let state = trainingTransition(INITIAL_TRAINING, 'start');
  state = trainingTransition(state, 'advance');
  state = trainingTransition(state, 'checkpoint');
  state = trainingTransition(state, 'advance');
  state = trainingTransition(state, 'interrupt');
  assert.equal(state.step, 2);
  state = trainingTransition(state, 'resume');
  assert.equal(state.step, 1);
  assert.equal(state.resource, 'Fallback');
  assert.equal(state.stage, 'running');
  assert.equal(trainingTransition(state, 'export'), state);
  while (state.stage === 'running') state = trainingTransition(state, 'advance');
  assert.equal(trainingTransition(state, 'export').stage, 'exported');
});

test('interruption without a saved checkpoint restarts from zero and invalid actions do nothing', () => {
  assert.equal(trainingTransition(INITIAL_TRAINING, 'resume'), INITIAL_TRAINING);
  const started = trainingTransition(INITIAL_TRAINING, 'start');
  assert.equal(trainingTransition(started, 'checkpoint'), started);
  const interrupted = trainingTransition(trainingTransition(started, 'advance'), 'interrupt');
  assert.equal(trainingTransition(interrupted, 'resume').step, 0);
});

test('six joint futures share observations but produce distinct paired outcomes', () => {
  assert.equal(FUTURES.length, 6);
  const outcomes = FUTURES.map((_, index) => trafficActors(index, 60));
  assert.equal(new Set(outcomes.map(value => JSON.stringify(value))).size, 6);
  for (let future = 0; future < 6; future++) assert.deepEqual(trafficActors(future, 0), trafficActors(0, 0));
  assert.notDeepEqual(trafficActors(3, 30)[0], trafficActors(0, 30)[0]);
  assert.deepEqual(trafficActors(3, 30)[1], trafficActors(0, 30)[1]);
});

test('illustrative residual model is bounded and zero bias or full correction matches reference', () => {
  for (let disc = 0; disc < 3; disc++) for (let frame = 0; frame <= 50; frame++) {
    const neutral = discForecast(disc, frame, 0, .5);
    assert.deepEqual(neutral.imperfect, neutral.reference);
    const corrected = discForecast(disc, frame, .8, 1);
    assert.deepEqual(corrected.corrected, corrected.reference);
    for (const point of Object.values(discForecast(disc, frame, -.8, .4))) assert.ok(point.x >= 45 && point.x <= 755 && point.y >= 45 && point.y <= 335);
  }
});

test('sample campus workflow enforces role responsibilities and supports reopening', () => {
  assert.equal(advanceCampus('Submitted', 'Reporter'), 'Submitted');
  assert.equal(advanceCampus('Submitted', 'Campus incharge'), 'Verified');
  assert.equal(advanceCampus('Verified', 'Campus incharge'), 'Assigned');
  assert.equal(advanceCampus('Assigned', 'Department officer'), 'In progress');
  assert.equal(advanceCampus('In progress', 'Department officer'), 'Resolved');
  const reopened = advanceCampus('Resolved', 'Reporter');
  assert.equal(reopened, 'Assigned');
  assert.equal(advanceCampus(reopened, 'Department officer'), 'In progress');
  assert.equal(advanceCampus('Resolved', 'Campus incharge'), 'Resolved');
});

test('sample location visibility requires consent, an approved device, and an authorized audience', () => {
  const sharing = { sharing: true, approved: true, ownerOnly: false, viewer: 'Family member' as const };
  assert.equal(canViewLocation(sharing), true);
  assert.equal(canViewLocation({ ...sharing, sharing: false }), false);
  assert.equal(canViewLocation({ ...sharing, approved: false }), false);
  assert.equal(canViewLocation({ ...sharing, ownerOnly: true }), false);
  assert.equal(canViewLocation({ ...sharing, ownerOnly: true, viewer: 'Owner' }), true);
  assert.equal(canViewLocation({ ...sharing, viewer: 'Unconnected visitor' }), false);
});
