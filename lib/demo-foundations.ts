export function binaryCard(bit: number): number[] {
  return Array.from({ length: 100 }, (_, index) => index + 1).filter(number => Boolean(number & (1 << bit)));
}

export function binaryAnswer(answers: boolean[]): number {
  return answers.slice(0, 7).reduce((number, answer, bit) => number + (answer ? 1 << bit : 0), 0);
}

export interface SortStep { values: number[]; active: number[]; explanation: string }
export function mergeSortSteps(input: number[]): SortStep[] {
  const values = [...input];
  const steps: SortStep[] = [{ values: [...values], active: [], explanation: 'Start with the unsorted sample values.' }];
  function sort(start: number, end: number) {
    if (end - start <= 1) return;
    const middle = Math.floor((start + end) / 2);
    sort(start, middle); sort(middle, end);
    const left = values.slice(start, middle), right = values.slice(middle, end);
    let a = 0, b = 0;
    for (let index = start; index < end; index++) {
      values[index] = b >= right.length || (a < left.length && left[a] <= right[b]) ? left[a++] : right[b++];
    }
    steps.push({ values: [...values], active: Array.from({ length: end - start }, (_, offset) => start + offset), explanation: `Merge positions ${start + 1}–${middle} and ${middle + 1}–${end} into sorted order.` });
  }
  sort(0, values.length);
  return steps;
}

export interface KnapsackItem { name: string; weight: number; value: number }
export function solveKnapsack(items: KnapsackItem[], capacity: number) {
  const limit = Math.max(0, Math.min(100, Math.floor(Number.isFinite(capacity) ? capacity : 0)));
  const dp = Array.from({ length: items.length + 1 }, () => Array(limit + 1).fill(0) as number[]);
  for (let index = 1; index <= items.length; index++) {
    const item = items[index - 1];
    for (let weight = 0; weight <= limit; weight++) {
      dp[index][weight] = dp[index - 1][weight];
      if (item.weight <= weight) dp[index][weight] = Math.max(dp[index][weight], dp[index - 1][weight - item.weight] + item.value);
    }
  }
  let remaining = limit;
  const selected: number[] = [];
  for (let index = items.length; index > 0; index--) {
    if (dp[index][remaining] !== dp[index - 1][remaining]) { selected.unshift(index - 1); remaining -= items[index - 1].weight; }
  }
  return { selected, value: dp[items.length][limit], weight: limit - remaining };
}

export interface CircularQueue { slots: (string | null)[]; head: number; tail: number; count: number }
export function emptyQueue(size = 5): CircularQueue {
  return { slots: Array(Math.max(1, size)).fill(null), head: 0, tail: 0, count: 0 };
}
export function enqueue(queue: CircularQueue, item: string): CircularQueue {
  if (queue.count === queue.slots.length) return queue;
  const slots = [...queue.slots]; slots[queue.tail] = item;
  return { slots, head: queue.head, tail: (queue.tail + 1) % slots.length, count: queue.count + 1 };
}
export function dequeue(queue: CircularQueue): CircularQueue {
  if (!queue.count) return queue;
  const slots = [...queue.slots]; slots[queue.head] = null;
  return { slots, head: (queue.head + 1) % slots.length, tail: queue.tail, count: queue.count - 1 };
}

export interface ExperimentRecord { name: string; steps: string[]; observation: string }
export function parseExperimentJSON(input: string): { record?: ExperimentRecord; error?: string } {
  let value: unknown;
  try { value = JSON.parse(input); } catch { return { error: 'Use valid JSON: check commas, quotation marks, and brackets.' }; }
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { error: 'The experiment must be a JSON object.' };
  const record = value as Partial<ExperimentRecord>;
  if (typeof record.name !== 'string' || !record.name.trim() || record.name.length > 100) return { error: 'Provide a name between 1 and 100 characters.' };
  if (!Array.isArray(record.steps) || !record.steps.length || record.steps.length > 8 || record.steps.some(step => typeof step !== 'string' || !step.trim() || step.length > 200)) return { error: 'Provide one to eight non-empty text steps, each up to 200 characters.' };
  if (typeof record.observation !== 'string' || record.observation.length > 500) return { error: 'Provide an observation as text, up to 500 characters.' };
  return { record: { name: record.name.trim(), steps: record.steps, observation: record.observation } };
}
