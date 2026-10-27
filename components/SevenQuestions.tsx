import { useEffect, useId, useReducer, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, RotateCcw, Undo2 } from 'lucide-react';
import { binaryCard, gameReducer, gameResult, newGame } from '../lib/seven-questions';
import './seven-questions.css';

export default function SevenQuestions({ startOnMount = false }: { startOnMount?: boolean }) {
  const [state, dispatch] = useReducer(gameReducer, startOnMount, newGame);
  const [locked, setLocked] = useState(false);
  const gate = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const heading = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const finished = state.answers.length === 7;
  const result = gameResult(state.answers);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (!state.started || (!finished && state.answers.length !== 0 && state.direction !== 'back')) return;
    const prompt = heading.current;
    prompt?.focus({ preventScroll: true });
    const card = prompt?.closest('.seven-card')?.getBoundingClientRect();
    if (card && (card.top < 96 || card.bottom > window.innerHeight)) prompt?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [finished, state.started, state.revision, state.answers.length, state.direction]);

  function answer(value: boolean) {
    if (gate.current || finished) return;
    gate.current = true;
    setLocked(true);
    dispatch({ type: 'answer', question: state.answers.length, answer: value });
    // A brief input gate prevents a double click from answering the next card.
    timer.current = window.setTimeout(() => { gate.current = false; setLocked(false); }, 280);
  }
  function restart() {
    window.clearTimeout(timer.current);
    gate.current = false;
    setLocked(false);
    dispatch({ type: 'restart' });
  }

  return <div className="seven-game demo-layout" data-ui="number-game">
    {!state.started ? <div className="seven-invitation">
      <p className="seven-range" aria-hidden="true">1—100<span>Keep one to yourself.</span></p>
      <div><h4>Think of a number from 1 to 100.</h4><p>Seven cards. A simple yes or no for each. Let’s see what a little logic can find.</p><button className="button button-dark" type="button" onClick={() => dispatch({ type: 'start' })}>Start the game <ArrowUpRight size={18} aria-hidden="true" /></button></div>
    </div> : <>
      <div className="seven-game-top"><p className="seven-question-count" role="status" aria-live="polite" aria-atomic="true">{finished ? 'Seven answers. One reveal.' : `Question ${state.answers.length + 1} of 7`}</p><span className="seven-step-marks" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <span className={index < state.answers.length ? 'is-answered' : index === state.answers.length ? 'is-current' : ''} key={index} />)}</span></div>
      <div className={`seven-card seven-card-${state.direction}`} key={state.revision}>
        <div className="seven-cut" aria-hidden="true" />
        {finished ? <div className="seven-reveal">
          <h4 ref={heading} tabIndex={-1} aria-describedby={`${id}-result`}>{result === null ? 'Let’s check those answers.' : 'Your number is'}</h4>
          {result !== null ? <p id={`${id}-result`} className="seven-answer">{result}</p> : <p id={`${id}-result`} className="seven-invalid">Those answers don’t describe a number from 1 to 100. Undo the last answer, or restart and check each card carefully.</p>}
          {result !== null && <p>Seven questions were all it took.</p>}
        </div> : <>
          <h4 ref={heading} tabIndex={-1} id={`${id}-question`}>Is your number on this card?</h4>
          <p className="seven-card-hint">Look through the numbers, then choose yes or no.</p>
          <ul className="seven-number-grid" aria-label={`Numbers on question ${state.answers.length + 1}`}>
            {binaryCard(state.answers.length).map(number => <li key={number}>{number}</li>)}
          </ul>
        </>}
      </div>
      <div className="seven-actions">
        {!finished && <div className="seven-answer-actions" aria-labelledby={`${id}-question`}><button type="button" className="seven-yes" aria-disabled={locked} onClick={() => answer(true)}>Yes, it is here <ArrowRight size={18} aria-hidden="true" /></button><button type="button" className="seven-no" aria-disabled={locked} onClick={() => answer(false)}>No, it is not</button></div>}
        <div className="seven-secondary-actions"><button type="button" disabled={!state.answers.length || locked} onClick={() => dispatch({ type: 'undo' })}><Undo2 size={16} aria-hidden="true" /> Undo</button><button type="button" onClick={restart}><RotateCcw size={16} aria-hidden="true" /> Restart</button></div>
      </div>
      {finished && <details className="seven-explanation" key={`explanation-${state.revision}`}><summary>How it works <span aria-hidden="true">+</span></summary><p>Each card represents one binary value: 1, 2, 4, 8, 16, 32, or 64. A number appears on the cards whose values add up to it.</p><div className="seven-binary-sum" aria-label="Values contributed by your seven answers">{state.answers.map((value, index) => <span key={index} className={value ? 'is-included' : ''}><small>Card {index + 1}</small>{value ? 1 << index : 0}</span>)}</div><p className="seven-equation">{state.answers.map((value, index) => value ? 1 << index : 0).join(' + ')} = {state.answers.reduce((sum, value, index) => sum + (value ? 1 << index : 0), 0)}</p><p>Seven yes-or-no answers distinguish 128 combinations, enough to find every number from 1 to 100.</p></details>}
    </>}
  </div>;
}
