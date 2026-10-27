import { useMemo, useReducer, useState } from 'react';
import { DemoActions, DemoFigure, RangeControl, useDemoPlayback } from './shared';
import {
  illustrativeFlight, pointsPath, INITIAL_TRAINING, trainingTransition,
  FUTURES, trafficActors, discForecast, CAMPUS_STAGES, CAMPUS_NEXT, advanceCampus, canViewLocation,
  type Point, type CampusStage, type CampusRole, type SharingSettings,
} from '../../lib/demo-science';

const INK = '#151515';
const PAPER = '#F5F4F0';
const RED = '#BE332B';
const STEEL = '#747875';
type Props = { id: string; active: boolean };

function PlaybackButtons({ playback, last }: { playback: ReturnType<typeof useDemoPlayback>; last: number }) {
  return <>
    {!playback.reducedMotion && <button type="button" className="demo-button" onClick={() => {
      if (playback.frame >= last) playback.setFrame(0);
      playback.setPlaying(!playback.playing);
    }}>{playback.playing ? 'Pause' : 'Play illustration'}</button>}
    <button type="button" className="demo-button" disabled={playback.frame >= last} onClick={() => { playback.setPlaying(false); playback.setFrame(frame => Math.min(frame + 1, last)); }}>Step forward</button>
  </>;
}

function TrajectoryDemo({ active }: { active: boolean }) {
  const [angle, setAngle] = useState(24);
  const [spin, setSpin] = useState(0);
  const [compare, setCompare] = useState(true);
  const playback = useDemoPlayback(active, 91);
  const flight = useMemo(() => illustrativeFlight(angle, spin), [angle, spin]);
  const baseline = useMemo(() => illustrativeFlight(angle, 0), [angle]);
  const screen = (point: Point) => ({ x: 70 + point.x * 95, y: 300 - point.y * 130 });
  const selected = screen(flight[playback.frame]);
  const nextBounce = flight.findIndex((point, index) => index > playback.frame && point.bounced);
  const change = (setter: (value: number) => void, value: number) => { setter(value); playback.setPlaying(false); playback.setFrame(0); };
  return <div className="demo-layout">
    <DemoFigure label="A simplified side-view flight: gravity, a qualitative spin effect, and energy lost at a bounce.">
      <svg viewBox="0 0 800 380" role="img" aria-label={`Illustrative ball trajectory at ${angle} degrees with ${spin === 0 ? 'no' : spin > 0 ? 'top' : 'back'} spin. Selected frame ${playback.frame}.`}>
        <rect width="800" height="380" fill="#e7e6e1" />
        <text x="38" y="43" fill={INK} fontSize="19">Change the inputs. Follow the bounce.</text>
        <path d="M45 301H755v14H45Z" fill={INK} />
        <path d="M400 300v-49" stroke={STEEL} strokeWidth="5" />
        {compare && <path d={pointsPath(baseline.map(screen))} fill="none" stroke={STEEL} strokeWidth="3" strokeDasharray="8 7" />}
        <path d={pointsPath(flight.map(screen))} fill="none" stroke={RED} strokeWidth="2" opacity=".25" />
        <path d={pointsPath(flight.slice(0, playback.frame + 1).map(screen))} fill="none" stroke={RED} strokeWidth="5" />
        {flight.filter(point => point.bounced).map((point, index) => <circle key={index} cx={screen(point).x} cy="300" r="6" fill={RED} />)}
        <circle cx={selected.x} cy={selected.y} r="10" fill={PAPER} stroke={RED} strokeWidth="4" />
        <text x="45" y="350" fill={INK} fontSize="17">Launch</text>
        <text x="640" y="350" fill={INK} fontSize="17">Table plane</text>
      </svg>
    </DemoFigure>
    <div className="demo-controls">
      <RangeControl label="Launch angle" value={angle} min={5} max={45} onChange={value => change(setAngle, value)} format={value => `${value}°`} />
      <RangeControl label="Spin direction" value={spin} min={-1} max={1} step={1} onChange={value => change(setSpin, value)} format={value => value < 0 ? 'Backspin' : value > 0 ? 'Topspin' : 'None'} />
      <RangeControl label="Flight frame" value={playback.frame} min={0} max={90} onChange={value => { playback.setPlaying(false); playback.setFrame(value); }} />
      <label className="demo-check"><input type="checkbox" checked={compare} onChange={event => setCompare(event.target.checked)} />Compare with no spin</label>
      <p className="demo-readout">{flight.slice(0, playback.frame + 1).filter(point => point.bounced).length} illustrated bounces reached.</p>
      <DemoActions onReset={() => { setAngle(24); setSpin(0); setCompare(true); playback.setPlaying(false); playback.setFrame(0); }}>
        <PlaybackButtons playback={playback} last={90} />
        <button type="button" className="demo-button" disabled={nextBounce < 0} onClick={() => { playback.setPlaying(false); playback.setFrame(nextBounce); }}>Next bounce</button>
      </DemoActions>
      <p className="demo-explanation">The muted trace holds spin at zero. This teaching model illustrates how changing a force changes the path; it does not measure a real ball’s speed, height, or spin.</p>
    </div>
  </div>;
}

function TrainingWorkflow({ state, dispatch, onReset }: { state: typeof INITIAL_TRAINING; dispatch: (action: Parameters<typeof trainingTransition>[1]) => void; onReset: () => void }) {
  const nodes = ['Prepare', 'Train', 'Checkpoint', 'Export'];
  const activeIndex = state.stage === 'ready' ? 0 : state.stage === 'complete' || state.stage === 'exported' ? 3 : state.checkpoint !== null ? 2 : 1;
  return <div className="demo-layout">
    <DemoFigure label="Checkpoint recovery keeps saved work; ordered fallback still uses one resource at a time.">
      <svg viewBox="0 0 800 380" role="img" aria-label={`Training workflow ${state.stage}, step ${state.step} of five, ${state.resource} resource, ${state.checkpoint === null ? 'no checkpoint' : `checkpoint at step ${state.checkpoint}`}.`}>
        <rect width="800" height="380" fill="#e7e6e1" />
        <text x="38" y="43" fill={INK} fontSize="19">What survives an interruption?</text>
        <path d="M90 160H710" stroke={STEEL} strokeWidth="5" />
        {nodes.map((label, index) => <g key={label}>
          <rect x={45 + index * 190} y="116" width="140" height="87" fill={index === activeIndex ? RED : INK} />
          <text x={115 + index * 190} y="166" textAnchor="middle" fill={PAPER} fontSize="18">{label}</text>
        </g>)}
        <rect x="75" y="257" width="280" height="61" fill={state.resource === 'Primary' ? INK : '#d0d1cb'} />
        <rect x="445" y="257" width="280" height="61" fill={state.resource === 'Fallback' ? INK : '#d0d1cb'} />
        <text x="215" y="293" textAnchor="middle" fill={state.resource === 'Primary' ? PAPER : INK} fontSize="18">Primary resource</text>
        <text x="585" y="293" textAnchor="middle" fill={state.resource === 'Fallback' ? PAPER : INK} fontSize="18">Fallback resource</text>
        <path d="M375 287h50m-14-8 14 8-14 8" fill="none" stroke={RED} strokeWidth="4" />
        <text x="400" y="352" textAnchor="middle" fill={INK} fontSize="17">Active resources: {state.stage === 'running' ? '1' : '0'}</text>
      </svg>
    </DemoFigure>
    <div className="demo-controls">
      <p className="demo-readout" role="status">{state.notice}</p>
      <p className="demo-legend">Illustrative training step {state.step} / 5<br />Saved checkpoint: {state.checkpoint ?? 'none'}</p>
      <DemoActions onReset={onReset}>
        <button type="button" className="demo-button" disabled={state.stage !== 'ready'} onClick={() => dispatch('start')}>Start workflow</button>
        <button type="button" className="demo-button" disabled={state.stage !== 'running'} onClick={() => dispatch('advance')}>Advance training</button>
        <button type="button" className="demo-button" disabled={state.stage !== 'running' || state.step === 0} onClick={() => dispatch('checkpoint')}>Save checkpoint</button>
        <button type="button" className="demo-button" disabled={state.stage !== 'running'} onClick={() => dispatch('interrupt')}>Interrupt</button>
        <button type="button" className="demo-button" disabled={state.stage !== 'interrupted'} onClick={() => dispatch('resume')}>Resume on fallback</button>
        <button type="button" className="demo-button" disabled={state.stage !== 'complete'} onClick={() => dispatch('export')}>Reach export stage</button>
      </DemoActions>
      <p className="demo-explanation">Try interrupting after unsaved steps. Recovery returns to the last checkpoint, or starts again if none exists. The real application also checks compatibility and exported artifacts.</p>
    </div>
  </div>;
}

function ForecastDemo({ active }: { active: boolean }) {
  const [future, setFuture] = useState(0);
  const [showPaths, setShowPaths] = useState(true);
  const playback = useDemoPlayback(active, 61);
  const actors = trafficActors(future, playback.frame);
  const paths = useMemo(() => FUTURES.map((_, index) => Array.from({ length: 61 }, (_, frame) => trafficActors(index, frame))), []);
  return <div className="demo-layout">
    <DemoFigure label="Both actors belong to the same selected future. These synthetic paths carry no model probabilities or safety scores.">
      <svg viewBox="0 0 800 380" role="img" aria-label={`Synthetic joint traffic future: ${FUTURES[future]}, frame ${playback.frame}.`}>
        <rect width="800" height="380" fill="#e7e6e1" />
        <path d="M0 145h800v130H0ZM405 0h130v380H405Z" fill="#c4c7bf" />
        <path d="M0 205h390m155 0h255M470 0v130m0 160v90" stroke={PAPER} strokeWidth="4" strokeDasharray="18 13" />
        {showPaths && paths.flatMap((samples, index) => [0, 1].map(actor => <path key={`${index}-${actor}`} d={pointsPath(samples.map(pair => pair[actor]))} fill="none" stroke={index === future ? RED : STEEL} strokeWidth={index === future ? 4 : 2} strokeDasharray={actor ? '9 7' : undefined} opacity={index === future ? .8 : .22} />))}
        <rect x={actors[0].x - 21} y={actors[0].y - 12} width="42" height="24" rx="5" fill={RED} stroke={PAPER} strokeWidth="3" />
        <rect x={actors[1].x - 12} y={actors[1].y - 21} width="24" height="42" rx="5" fill={INK} stroke={PAPER} strokeWidth="3" />
        <text x="35" y="42" fill={INK} fontSize="19">One observation. Several possible futures.</text>
        <text x="35" y="350" fill={INK} fontSize="17">Actor A: solid path · Actor B: dashed path</text>
      </svg>
    </DemoFigure>
    <div className="demo-controls">
      <div className="demo-choice-group" role="group" aria-label="Choose a joint future">{FUTURES.map((label, index) => <button type="button" key={label} className="demo-button" aria-pressed={future === index} onClick={() => { setFuture(index); playback.setPlaying(false); }}>{label}</button>)}</div>
      <RangeControl label="Scenario frame" value={playback.frame} min={0} max={60} onChange={value => { playback.setPlaying(false); playback.setFrame(value); }} />
      <label className="demo-check"><input type="checkbox" checked={showPaths} onChange={event => setShowPaths(event.target.checked)} />Show possible paths</label>
      <DemoActions onReset={() => { setFuture(0); setShowPaths(true); playback.setFrame(0); playback.setPlaying(false); }}><PlaybackButtons playback={playback} last={60} /></DemoActions>
      <p className="demo-explanation">A joint forecast describes how actors might move together. Selecting “A yields” changes A’s timing while keeping B in that same scenario. These hand-authored examples illustrate uncertainty, rather than predicting real traffic.</p>
    </div>
  </div>;
}

function WorldModelDemo({ active }: { active: boolean }) {
  const [bias, setBias] = useState(.65);
  const [correction, setCorrection] = useState(.6);
  const [horizon, setHorizon] = useState(20);
  const playback = useDemoPlayback(active, horizon + 1);
  const frame = Math.min(playback.frame, horizon);
  const tracks = Array.from({ length: 3 }, (_, disc) => Array.from({ length: horizon + 1 }, (_, sample) => discForecast(disc, sample, bias, correction)));
  return <div className="demo-layout">
    <DemoFigure label="Three discs, an imperfect prediction, and an adjustable correction. The tracks are mathematical illustrations, not trained-model outputs.">
      <svg viewBox="0 0 800 380" role="img" aria-label={`Three-disc forecast comparison at frame ${frame}, drift ${bias}, correction ${correction}.`}>
        <rect width="800" height="380" fill="#e7e6e1" />
        <path d="M32 32H768V348H32Z" fill={PAPER} />
        {tracks.map((samples, disc) => <g key={disc}>
          <path d={pointsPath(samples.map(sample => sample.reference))} fill="none" stroke={INK} strokeWidth="3" opacity=".45" />
          <path d={pointsPath(samples.map(sample => sample.imperfect))} fill="none" stroke={STEEL} strokeWidth="3" strokeDasharray="7 6" />
          <path d={pointsPath(samples.map(sample => sample.corrected))} fill="none" stroke={RED} strokeWidth="3" opacity=".75" />
          <circle cx={samples[frame].reference.x} cy={samples[frame].reference.y} r="10" fill={INK} />
          <circle cx={samples[frame].imperfect.x} cy={samples[frame].imperfect.y} r="15" fill="none" stroke={STEEL} strokeWidth="3" strokeDasharray="4 3" />
          <circle cx={samples[frame].corrected.x} cy={samples[frame].corrected.y} r="19" fill="none" stroke={RED} strokeWidth="3" />
        </g>)}
      </svg>
    </DemoFigure>
    <div className="demo-controls">
      <p className="demo-legend">Black: reference · Dashed gray: imperfect model · Red: correction</p>
      <RangeControl label="Illustrative model drift" value={bias} min={-1} max={1} step={.05} onChange={setBias} format={value => value.toFixed(2)} />
      <RangeControl label="Correction strength" value={correction} min={0} max={1} step={.05} onChange={setCorrection} format={value => value.toFixed(2)} />
      <label className="demo-select">Forecast length<select value={horizon} onChange={event => { setHorizon(Number(event.target.value)); playback.setFrame(0); playback.setPlaying(false); }}><option value="10">10 frames</option><option value="20">20 frames</option><option value="50">50 frames</option></select></label>
      <RangeControl label="Forecast frame" value={frame} min={0} max={horizon} onChange={value => { playback.setPlaying(false); playback.setFrame(value); }} />
      <DemoActions onReset={() => { setBias(.65); setCorrection(.6); setHorizon(20); playback.setFrame(0); playback.setPlaying(false); }}><PlaybackButtons playback={playback} last={horizon} /></DemoActions>
      <p className="demo-explanation">Small model errors can accumulate across a longer rollout. This example lets you remove a known artificial drift. Whether a learned correction improves a strong physics baseline is a separate research question.</p>
    </div>
  </div>;
}

function CampusDemo() {
  const [stage, setStage] = useState<CampusStage>('Submitted');
  const [role, setRole] = useState<CampusRole>('Reporter');
  const [history, setHistory] = useState<(CampusStage | 'Reopened')[]>(['Submitted']);
  const next = CAMPUS_NEXT[stage];
  return <div className="demo-layout">
    <DemoFigure label="A fictional classroom-light issue moves between reporting, campus routing, and departmental work.">
      <svg viewBox="0 0 800 380" role="img" aria-label={`Fictional issue is ${stage}. Viewing as ${role}.`}>
        <rect width="800" height="380" fill="#e7e6e1" />
        <text x="38" y="43" fill={INK} fontSize="19">A clear route from report to resolution.</text>
        <path d="M65 160H735" stroke={STEEL} strokeWidth="5" />
        <path d="M735 128V85H400v43m-7-10 7 10 7-10" fill="none" stroke={RED} strokeWidth="3" />
        <text x="565" y="72" textAnchor="middle" fill={INK} fontSize="16">Reopen starts a new cycle</text>
        {CAMPUS_STAGES.map((label, index) => <g key={label}>
          <circle cx={65 + index * 167.5} cy="160" r="22" fill={stage === label ? RED : history.includes(label) ? INK : PAPER} />
          {history.includes(label) && stage !== label && <path d={`m${55 + index * 167.5} 160 7 7 14-16`} fill="none" stroke={PAPER} strokeWidth="3" />}
          <text x={65 + index * 167.5} y="213" textAnchor="middle" fill={INK} fontSize="16">{label}</text>
        </g>)}
        <rect x="45" y="260" width="710" height="67" fill={PAPER} />
        <text x="67" y="289" fill={INK} fontSize="18">Sample issue: classroom light needs repair</text>
        <text x="67" y="313" fill={INK} fontSize="16">Routing: Facilities · Current stage: {stage}</text>
      </svg>
    </DemoFigure>
    <div className="demo-controls">
      <label className="demo-select">View as<select value={role} onChange={event => setRole(event.target.value as CampusRole)}>{(['Reporter', 'Campus incharge', 'Department officer'] as const).map(item => <option key={item}>{item}</option>)}</select></label>
      <p className="demo-readout" role="status">{stage}. {role === next.role ? `${role} can continue this step.` : `Switch to ${next.role} to continue.`}</p>
      <DemoActions onReset={() => { setStage('Submitted'); setRole('Reporter'); setHistory(['Submitted']); }}>
        <button type="button" className="demo-button" disabled={role !== next.role} onClick={() => { const updated = advanceCampus(stage, role); setStage(updated); setHistory(previous => stage === 'Resolved' ? [...previous, 'Reopened', updated] : [...previous, updated]); }}>{next.label}</button>
      </DemoActions>
      <p className="demo-legend">Resolution cycle {history.filter(event => event === 'Reopened').length + 1} · Issue history: {history.slice(-5).join(' → ')}</p>
      <p className="demo-explanation">Role changes here only switch the educational perspective. Reopening immediately returns an eligible issue to Assigned and starts a new service-level cycle. The real application enforces permissions on its server and retains the previous resolution.</p>
    </div>
  </div>;
}

function LocationDemo() {
  const [settings, setSettings] = useState<SharingSettings>({ sharing: true, approved: true, ownerOnly: false, viewer: 'Family member' });
  const [age, setAge] = useState(0);
  const visible = canViewLocation(settings);
  const update = <K extends keyof SharingSettings>(key: K, value: SharingSettings[K]) => setSettings(previous => ({ ...previous, [key]: value }));
  return <div className="demo-layout">
    <DemoFigure label="A fictional location on an abstract map. This demo never requests your device location.">
      <svg viewBox="0 0 800 380" role="img" aria-label={`${settings.viewer} ${visible ? `can see the sample location, ${age} minutes old` : 'cannot see the sample location'}.`}>
        <rect width="800" height="380" fill="#e7e6e1" />
        <path d="M70 75h180v95H70ZM335 65h180v105H335ZM600 60h140v110H600ZM70 240h180v90H70ZM335 240h180v90H335ZM600 240h140v90H600Z" fill="#c4c7bf" />
        <path d="M0 205h800M290 0v380M555 0v380" stroke={PAPER} strokeWidth="30" />
        {visible ? <g opacity={age > 10 ? .55 : 1}>
          <circle cx="555" cy="205" r="33" fill={PAPER} />
          <circle cx="555" cy="205" r="17" fill={RED} />
          <path d="m544 233 11 17 11-17" fill={RED} />
          <rect x="420" y="267" width="270" height="66" fill={INK} />
          <text x="555" y="294" textAnchor="middle" fill={PAPER} fontSize="18">Sample member</text>
          <text x="555" y="319" textAnchor="middle" fill={PAPER} fontSize="16">{age === 0 ? 'Just received' : `${age} minutes since update`}</text>
        </g> : <g><rect x="190" y="145" width="420" height="90" fill={INK} /><text x="400" y="183" textAnchor="middle" fill={PAPER} fontSize="19">Location is not visible</text><text x="400" y="212" textAnchor="middle" fill={PAPER} fontSize="16">Consent, device approval, and audience apply.</text></g>}
        <text x="35" y="40" fill={INK} fontSize="19">Sharing is a permission, not a public broadcast.</text>
      </svg>
    </DemoFigure>
    <div className="demo-controls">
      <label className="demo-select">Viewing audience<select value={settings.viewer} onChange={event => update('viewer', event.target.value as SharingSettings['viewer'])}>{(['Owner', 'Family member', 'Unconnected visitor'] as const).map(viewer => <option key={viewer}>{viewer}</option>)}</select></label>
      <label className="demo-check"><input type="checkbox" checked={settings.sharing} onChange={event => update('sharing', event.target.checked)} />Member enables location sharing</label>
      <label className="demo-check"><input type="checkbox" checked={settings.approved} onChange={event => update('approved', event.target.checked)} />Device is owner-approved</label>
      <label className="demo-check"><input type="checkbox" checked={settings.ownerOnly} onChange={event => update('ownerOnly', event.target.checked)} />Owner-only connection</label>
      <RangeControl label="Age of sample location" value={age} min={0} max={30} onChange={setAge} format={value => `${value} min`} />
      <p className="demo-readout" role="status">{visible ? `${settings.viewer} can see this sample fix. Its age describes freshness.` : 'The selected audience cannot see the sample fix.'}</p>
      <DemoActions onReset={() => { setSettings({ sharing: true, approved: true, ownerOnly: false, viewer: 'Family member' }); setAge(0); }} />
      <p className="demo-explanation">An older measurement does not prove someone has stopped moving. The real project reports location age and accuracy and stores no route history; phone restrictions can interrupt background updates.</p>
    </div>
  </div>;
}

export default function ResearchDemos({ id, active }: Props) {
  const [resetKey, setResetKey] = useState(0);
  if (id === 'tt-trajectory-engine') return <TrajectoryDemo active={active} />;
  if (id === 'multigpu') return <ResettableTraining key={resetKey} onReset={() => setResetKey(value => value + 1)} />;
  if (id === 'autonomous-driving-prediction') return <ForecastDemo active={active} />;
  if (id === 'neural-world-model') return <WorldModelDemo active={active} />;
  if (id === 'fixmycampus') return <CampusDemo />;
  if (id === 'famgpslink') return <LocationDemo />;
  return null;
}

function ResettableTraining({ onReset }: { onReset: () => void }) {
  const [state, dispatch] = useReducer(trainingTransition, INITIAL_TRAINING);
  return <TrainingWorkflow state={state} dispatch={dispatch} onReset={onReset} />;
}
