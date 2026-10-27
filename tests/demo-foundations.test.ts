import assert from 'node:assert/strict';
import test from 'node:test';
import { binaryCard, binaryAnswer, mergeSortSteps, solveKnapsack, emptyQueue, enqueue, dequeue, parseExperimentJSON } from '../lib/demo-foundations.ts';

test('seven binary cards reconstruct every number from one to one hundred', () => {
  for (let number = 1; number <= 100; number++) {
    const answers = Array.from({ length: 7 }, (_, bit) => binaryCard(bit).includes(number));
    assert.equal(binaryAnswer(answers), number);
  }
  assert.equal(binaryAnswer(Array(7).fill(false)), 0);
});

test('merge sort steps retain the input and finish sorted for duplicates and empty input', () => {
  for (const values of [[8, 3, 1, 6, 3, 2], [], [1]]) {
    const before = [...values]; const steps = mergeSortSteps(values);
    assert.deepEqual(values, before);
    assert.deepEqual(steps.at(-1)?.values, [...values].sort((a, b) => a - b));
    assert.ok(steps.every(step => step.values.length === values.length));
  }
});

test('knapsack selects the best feasible subset rather than a greedy highest-value item', () => {
  const items = [{ name: 'A', weight: 3, value: 4 }, { name: 'B', weight: 4, value: 5 }, { name: 'C', weight: 5, value: 7 }];
  assert.deepEqual(solveKnapsack(items, 7), { selected: [0, 1], value: 9, weight: 7 });
  assert.deepEqual(solveKnapsack(items, 0), { selected: [], value: 0, weight: 0 });
  for (let capacity = 0; capacity <= 15; capacity++) {
    const result = solveKnapsack(items, capacity);
    const exhaustive = Array.from({ length: 8 }, (_, mask) => items.reduce((sum, item, index) => ({ weight: sum.weight + ((mask & (1 << index)) ? item.weight : 0), value: sum.value + ((mask & (1 << index)) ? item.value : 0) }), { weight: 0, value: 0 })).filter(item => item.weight <= capacity);
    assert.equal(result.value, Math.max(...exhaustive.map(item => item.value)));
    assert.ok(result.weight <= capacity);
  }
});

test('circular queue rejects overflow and underflow and reuses wrapped slots in FIFO order', () => {
  let queue = emptyQueue(3); assert.equal(dequeue(queue), queue);
  queue = enqueue(enqueue(enqueue(queue, 'A'), 'B'), 'C');
  assert.equal(enqueue(queue, 'overflow'), queue);
  queue = enqueue(dequeue(queue), 'D');
  assert.deepEqual(queue.slots, ['D', 'B', 'C']); assert.equal(queue.head, 1); assert.equal(queue.tail, 1);
  const output: string[] = [];
  while (queue.count) { output.push(queue.slots[queue.head]!); queue = dequeue(queue); }
  assert.deepEqual(output, ['B', 'C', 'D']); assert.equal(queue.count, 0);
});

test('experiment JSON validates the displayed record and never evaluates text', () => {
  const valid = { name: 'Sample observation', steps: ['Prepare a sample', 'Record an observation'], observation: 'Example only.' };
  assert.deepEqual(parseExperimentJSON(JSON.stringify(valid)), { record: valid });
  for (const invalid of ['{broken', '[]', 'null', '{}', '{"name":"Sample","steps":[5],"observation":""}', '{"name":"Sample","steps":[],"observation":""}']) assert.ok(parseExperimentJSON(invalid).error);
  assert.ok(parseExperimentJSON(JSON.stringify({ ...valid, observation: '<script>text only</script>' })).record);
});
