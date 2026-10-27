import { Component, lazy, Suspense, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './seven-questions.css';

const SevenQuestions = lazy(() => import('./SevenQuestions'));
class GameBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="seven-load-state" role="alert">The game couldn’t load. Refresh the page to try again.</p> : this.props.children; }
}

export default function PlaySection() {
  const [started, setStarted] = useState(false);
  return <section className="play-section page-frame" id="play" aria-labelledby="play-heading">
    <div className="play-intro"><h2 id="play-heading">Seven<br /> questions.</h2><p>Think of a number from 1 to 100.</p><p>Keep it to yourself. I’ll find it with seven yes-or-no answers.</p><p className="play-credit">A small game about a powerful idea.<br />Educational demo · binary deduction.</p></div>
    <div className="play-stage">
      {started ? <GameBoundary><Suspense fallback={<p className="seven-load-state" role="status">Opening the first card…</p>}><SevenQuestions startOnMount /></Suspense></GameBoundary> : <div className="play-invitation">
        <div className="play-paper-art" aria-hidden="true"><span className="play-paper-back" /><span className="play-paper-front"><strong>?</strong></span></div>
        <div className="play-start"><p>Ready when you are.</p><button className="button button-dark" type="button" onClick={() => setStarted(true)}>Start the game <ArrowUpRight size={18} aria-hidden="true" /></button></div>
      </div>}
    </div>
  </section>;
}
