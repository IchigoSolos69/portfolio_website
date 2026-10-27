import { binaryAnswer, binaryCard } from './demo-foundations.ts';

export { binaryAnswer, binaryCard };
export type GameState = { started: boolean; answers: boolean[]; revision: number; direction: 'forward' | 'back' };
export type GameAction = { type: 'start' | 'restart' | 'undo' } | { type: 'answer'; question: number; answer: boolean };

export function newGame(started = false): GameState {
  return { started, answers: [], revision: 0, direction: 'forward' };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'start' || action.type === 'restart') return { ...newGame(true), revision: state.revision + 1 };
  if (action.type === 'undo') return state.answers.length ? { ...state, answers: state.answers.slice(0, -1), revision: state.revision + 1, direction: 'back' } : state;
  if (action.type !== 'answer' || !state.started || state.answers.length >= 7 || action.question !== state.answers.length) return state;
  return { ...state, answers: [...state.answers, action.answer], revision: state.revision + 1, direction: 'forward' };
}

export function gameResult(answers: boolean[]): number | null {
  if (answers.length !== 7) return null;
  const result = binaryAnswer(answers);
  return result >= 1 && result <= 100 ? result : null;
}
