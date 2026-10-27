import { useState } from 'react';

const views = [
  { title: 'Full capture', box: '0 0 1630 1003', description: 'An actual desktop capture from the public repository, showing a recorded analysis session.' },
  { title: 'Source & model controls', box: '730 0 850 85', description: 'The recording and camera sources are explicit. Native inference uses selected models and compatible NVIDIA hardware.' },
  { title: 'Frame review', box: '135 495 1355 215', description: 'Frame controls and the seek bar review indexed analysis results independently of playback speed.' },
  { title: 'Tracking overlays', box: '290 710 1050 293', description: 'Detections and estimated table geometry are overlaid on footage. These observations do not establish physical measurement accuracy.' },
];

export default function TTCapture() {
  const [selected, setSelected] = useState(0);
  const [, , width, height] = views[selected].box.split(' ').map(Number);
  return <figure className="capture-explorer" data-ui="capture-explorer">
    <svg viewBox={views[selected].box} style={{ aspectRatio: `${width} / ${height}` }} role="img" aria-label={`TT Trajectory Engine application: ${views[selected].title}`}><image href="/assets/projects/tt-analysis.png" width="1630" height="1003" /></svg>
    <div className="capture-controls" aria-label="Explore the application capture">{views.map((view, index) => <button type="button" key={view.title} aria-pressed={selected === index} onClick={() => setSelected(index)}>{view.title}</button>)}</div>
    <figcaption aria-live="polite">{views[selected].description}</figcaption>
  </figure>;
}
