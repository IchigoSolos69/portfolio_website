import { lazy, Suspense, useId, useMemo, useState, type ReactNode } from 'react';
import { dequeue, emptyQueue, enqueue, mergeSortSteps, parseExperimentJSON, solveKnapsack, type ExperimentRecord } from '../../lib/demo-foundations';
import { DemoActions, DemoFigure, RangeControl, useDemoPlayback } from './shared';

const SevenQuestions = lazy(() => import('../SevenQuestions'));
const INK = '#151515', PAPER = '#F5F4F0', RED = '#BE332B', STEEL = '#b7b7b7';
function Diagram({ label, children }: { label: string; children: ReactNode }) {
  return <svg viewBox="0 0 800 380" role="img" aria-label={label}><rect width="800" height="380" fill={PAPER} />{children}</svg>;
}
function Button({ children, onClick, disabled = false }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return <button type="button" className="demo-button" onClick={onClick} disabled={disabled}>{children}</button>;
}

const SOCIAL_ROWS = [
  { tag: 'build', group: 'Code', count: 18 }, { tag: 'python', group: 'Code', count: 12 },
  { tag: 'type', group: 'Design', count: 15 }, { tag: 'motion', group: 'Design', count: 9 },
  { tag: 'opencv', group: 'Code', count: 7 },
];
function DataTools() {
  const [group, setGroup] = useState('All');
  const [query, setQuery] = useState('');
  const rows = SOCIAL_ROWS.filter(row => (group === 'All' || row.group === group) && row.tag.includes(query.trim().toLowerCase()));
  return <div className="demo-layout">
    <div className="demo-controls"><label>Sample category<select value={group} onChange={event => setGroup(event.target.value)}>{['All', 'Code', 'Design'].map(value => <option key={value}>{value}</option>)}</select></label><label>Filter sample tags<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try python" /></label></div>
    <DemoFigure label="Fictional tag frequencies; no Instagram accounts or network requests are involved."><Diagram label="Filtered sample hashtag counts">{rows.map((row, index) => <g key={row.tag}><text x="38" y={53 + index * 62} fontSize="22" fill={INK}>#{row.tag}</text><rect x="190" y={28 + index * 62} width={row.count * 25} height="34" fill={row.group === 'Code' ? RED : INK} /><text x={205 + row.count * 25} y={53 + index * 62} fontSize="21" fill={INK}>{row.count}</text></g>)}{!rows.length && <text x="40" y="190" fill={INK} fontSize="26">No sample tags match this filter.</text>}</Diagram></DemoFigure>
    <p className="demo-readout" role="status">{rows.length} tags · {rows.reduce((sum, row) => sum + row.count, 0)} sample mentions</p>
    <DemoActions onReset={() => { setGroup('All'); setQuery(''); }} />
  </div>;
}

const STOCK = [{ name: 'Notebook', price: 80, quantity: 5 }, { name: 'Cable', price: 150, quantity: 3 }, { name: 'Marker', price: 40, quantity: 8 }];
function Inventory() {
  const [items, setItems] = useState(STOCK);
  const [sort, setSort] = useState('Name');
  const rows = [...items].sort((a, b) => sort === 'Quantity' ? b.quantity - a.quantity : sort === 'Value' ? b.quantity * b.price - a.quantity * a.price : a.name.localeCompare(b.name));
  return <div className="demo-layout">
    <div className="demo-controls"><label>Sort sample inventory<select value={sort} onChange={event => setSort(event.target.value)}>{['Name', 'Quantity', 'Value'].map(value => <option key={value}>{value}</option>)}</select></label></div>
    <div className="demo-table-wrap"><table className="demo-table"><caption>Fictional inventory · sample prices in rupees</caption><thead><tr><th scope="col">Item</th><th scope="col">Quantity</th><th scope="col">Unit price</th><th scope="col">Value</th></tr></thead><tbody>{rows.map(item => <tr key={item.name}><th scope="row">{item.name}</th><td><input aria-label={`${item.name} quantity`} type="number" min="0" max="25" value={item.quantity} onChange={event => { const quantity = Math.max(0, Math.min(25, Math.floor(Number(event.target.value) || 0))); setItems(current => current.map(row => row.name === item.name ? { ...row, quantity } : row)); }} /></td><td>₹{item.price}</td><td>₹{item.price * item.quantity}</td></tr>)}</tbody></table></div>
    <p className="demo-readout" role="status">Sample inventory value: ₹{items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('en-IN')}</p>
    <DemoActions onReset={() => { setItems(STOCK); setSort('Name'); }} />
  </div>;
}

const WEATHER = { Pune: { temperature: 24, humidity: 58, wind: 9, pm: 24 }, Mumbai: { temperature: 29, humidity: 76, wind: 17, pm: 31 }, Shimla: { temperature: 13, humidity: 64, wind: 6, pm: 12 } };
function Weather() {
  const [city, setCity] = useState<keyof typeof WEATHER>('Pune');
  const [unit, setUnit] = useState('Celsius');
  const sample = WEATHER[city]; const temperature = unit === 'Celsius' ? sample.temperature : sample.temperature * 9 / 5 + 32;
  return <div className="demo-layout">
    <div className="demo-controls"><label>Sample location<select value={city} onChange={event => setCity(event.target.value as keyof typeof WEATHER)}>{Object.keys(WEATHER).map(value => <option key={value}>{value}</option>)}</select></label><label>Temperature unit<select value={unit} onChange={event => setUnit(event.target.value)}><option>Celsius</option><option>Fahrenheit</option></select></label></div>
    <DemoFigure label="Fixed demonstration readings; these are not current weather or air-quality measurements."><Diagram label={`Sample ${city} conditions in ${unit}`}><circle cx="590" cy="130" r="61" fill={RED} /><path d="M470 180h175a40 40 0 0 1 0 80H464a43 43 0 0 1 6-80Z" fill={STEEL} /><text x="44" y="73" fontSize="27" fill={INK}>{city} · sample</text><text x="38" y="200" fontSize="90" fontWeight="600" fill={INK}>{temperature.toFixed(unit === 'Celsius' ? 0 : 1)}°{unit === 'Celsius' ? 'C' : 'F'}</text><text x="44" y="275" fontSize="23" fill={INK}>Humidity {sample.humidity}% · wind {sample.wind} km/h</text><text x="44" y="323" fontSize="23" fill={INK}>PM2.5 field: {sample.pm} µg/m³</text></Diagram></DemoFigure>
    <p className="demo-explanation">Weather data and air-quality data are separate responses. A desktop interface combines their values while keeping units explicit.</p>
    <DemoActions onReset={() => { setCity('Pune'); setUnit('Celsius'); }} />
  </div>;
}

const EXPERIMENT: ExperimentRecord = { name: 'Sample observation', steps: ['Label the sample', 'Record its appearance'], observation: 'Fictional record used to explain structured information.' };
function Chemistry() {
  const [record, setRecord] = useState(EXPERIMENT);
  const [json, setJson] = useState(JSON.stringify(EXPERIMENT, null, 2));
  const [mode, setMode] = useState<'fields' | 'json'>('fields');
  const parsed = parseExperimentJSON(json);
  const change = (next: ExperimentRecord) => { setRecord(next); setJson(JSON.stringify(next, null, 2)); };
  const reset = () => { setRecord(EXPERIMENT); setJson(JSON.stringify(EXPERIMENT, null, 2)); setMode('fields'); };
  return <div className="demo-layout">
    <div className="demo-actions"><Button disabled={mode === 'fields' || Boolean(parsed.error)} onClick={() => setMode('fields')}>Structured fields</Button><Button disabled={mode === 'json'} onClick={() => setMode('json')}>JSON record</Button></div>
    {mode === 'fields' ? <div className="demo-controls"><label>Experiment name<input maxLength={100} value={record.name} onChange={event => change({ ...record, name: event.target.value })} /></label><label>Steps, one per line<textarea rows={4} maxLength={1800} value={record.steps.join('\n')} onChange={event => change({ ...record, steps: event.target.value.split('\n') })} /></label><label>Observation<textarea rows={3} maxLength={500} value={record.observation} onChange={event => change({ ...record, observation: event.target.value })} /></label></div> : <label className="demo-code-label">Editable sample JSON<textarea className="demo-json-editor" rows={12} maxLength={5000} spellCheck={false} value={json} aria-invalid={Boolean(parsed.error)} aria-describedby="experiment-json-status" onChange={event => { setJson(event.target.value); const result = parseExperimentJSON(event.target.value); if (result.record) setRecord(result.record); }} /></label>}
    <p id="experiment-json-status" className="demo-readout" role="status">{parsed.error || `Valid record: ${parsed.record!.steps.length} steps kept in a predictable JSON structure.`}</p>
    <p className="demo-explanation">These controls explain the record format. They do not perform OCR or extract a scanned manual.</p>
    <DemoActions onReset={reset} />
  </div>;
}

function Hospital() {
  const [queue, setQueue] = useState(['Entry A', 'Entry B', 'Entry C']);
  const [next, setNext] = useState(4);
  const [selected, setSelected] = useState('Entry C');
  return <div className="demo-layout">
    <DemoFigure label="Fictional queue entries illustrate list operations; no patient information is used."><Diagram label="Singly linked queue with a front pointer">{queue.map((entry, index) => <g key={entry} transform={`translate(${34 + index * 125} 145)`}><rect width="104" height="78" fill={index === 0 ? RED : INK} /><text x="52" y="46" textAnchor="middle" fill={PAPER} fontSize="20">{entry}</text>{index < queue.length - 1 && <path d="M107 39h14m-6-6 7 6-7 6" stroke={INK} strokeWidth="3" fill="none" />}{index === 0 && <text x="52" y="-24" textAnchor="middle" fill={INK} fontSize="23">Front</text>}</g>)}{!queue.length && <text x="40" y="190" fill={INK} fontSize="30">The queue is empty.</text>}</Diagram></DemoFigure>
    <div className="demo-controls"><label>Entry to move<select value={queue.includes(selected) ? selected : queue[0] || ''} disabled={!queue.length} onChange={event => setSelected(event.target.value)}>{!queue.length && <option value="">Empty queue</option>}{queue.map(entry => <option key={entry}>{entry}</option>)}</select></label></div>
    <DemoActions onReset={() => { setQueue(['Entry A', 'Entry B', 'Entry C']); setNext(4); setSelected('Entry C'); }}><Button disabled={queue.length >= 6} onClick={() => { setQueue(current => [...current, `Entry ${String.fromCharCode(64 + next)}`]); setNext(current => current + 1); }}>Add entry</Button><Button disabled={!queue.length} onClick={() => setQueue(current => current.slice(1))}>Remove front</Button><Button disabled={!queue.length || (queue.includes(selected) ? selected : queue[0]) === queue[0]} onClick={() => { const entry = queue.includes(selected) ? selected : queue[0]; setQueue(current => [entry, ...current.filter(item => item !== entry)]); }}>Move to front</Button></DemoActions>
    <p className="demo-readout" role="status">{queue.length} entries. Moving an entry changes links; removing the front advances the head.</p>
  </div>;
}

function CircularQueue() {
  const initial = () => enqueue(enqueue(emptyQueue(), 'A'), 'B');
  const [queue, setQueue] = useState(initial); const [next, setNext] = useState(3);
  return <div className="demo-layout"><DemoFigure label="Five reusable slots make a circular queue; head points to the next item removed."><Diagram label={`Circular queue with ${queue.count} occupied slots`}>{queue.slots.map((value, index) => { const angle = index * Math.PI * 2 / 5 - Math.PI / 2; const x = 400 + Math.cos(angle) * 190, y = 190 + Math.sin(angle) * 125; return <g key={index} transform={`translate(${x} ${y})`}><rect x="-54" y="-37" width="108" height="74" fill={value ? RED : STEEL} /><text textAnchor="middle" y="8" fontSize="27" fill={value ? PAPER : INK}>{value || 'Empty'}</text><text textAnchor="middle" y="-52" fontSize="18" fill={INK}>Slot {index}</text><text textAnchor="middle" y="62" fontSize="18" fontWeight="600" fill={INK}>{[index === queue.head ? 'Head' : '', index === queue.tail ? 'Tail' : ''].filter(Boolean).join(' / ')}</text></g>; })}</Diagram></DemoFigure>
    <p className="demo-readout" role="status">{queue.count} / 5 occupied · head {queue.head} · tail {queue.tail}{queue.count === 5 ? ' · full' : queue.count === 0 ? ' · empty' : ''}</p>
    <DemoActions onReset={() => { setQueue(initial()); setNext(3); }}><Button disabled={queue.count === 5} onClick={() => { setQueue(current => enqueue(current, String.fromCharCode(64 + (next - 1) % 26 + 1))); setNext(current => current + 1); }}>Enqueue</Button><Button disabled={!queue.count} onClick={() => setQueue(current => dequeue(current))}>Dequeue</Button></DemoActions>
  </div>;
}

const ALGORITHM_ITEMS = [{ name: 'A', weight: 2, value: 3 }, { name: 'B', weight: 3, value: 4 }, { name: 'C', weight: 4, value: 6 }, { name: 'D', weight: 5, value: 7 }];
function Algorithms({ active }: { active: boolean }) {
  const [mode, setMode] = useState('Merge sort'); const [capacity, setCapacity] = useState(7);
  const steps = useMemo(() => mergeSortSteps([38, 12, 65, 27, 49, 8]), []);
  const playback = useDemoPlayback(active && mode === 'Merge sort', steps.length);
  const step = steps[playback.frame]; const optimum = solveKnapsack(ALGORITHM_ITEMS, capacity);
  const reset = () => { setMode('Merge sort'); setCapacity(7); playback.setPlaying(false); playback.setFrame(0); };
  return <div className="demo-layout"><div className="demo-controls"><label>Algorithm<select value={mode} onChange={event => { setMode(event.target.value); playback.setPlaying(false); }}><option>Merge sort</option><option>Knapsack</option></select></label></div>
    {mode === 'Merge sort' ? <><DemoFigure label="Each step merges two sorted ranges; the highlighted range was just updated."><Diagram label={`Merge sort step ${playback.frame + 1}`}><path d="M40 310h710" stroke={STEEL} strokeWidth="3" />{step.values.map((value, index) => <g key={index}><rect x={66 + index * 115} y={290 - value * 3} width="74" height={value * 3} fill={step.active.includes(index) ? RED : INK} /><text x={103 + index * 115} y="341" textAnchor="middle" fontSize="23" fill={INK}>{value}</text></g>)}</Diagram></DemoFigure><RangeControl label="Sort step" value={playback.frame} min={0} max={steps.length - 1} format={value => `${value + 1} / ${steps.length}`} onChange={value => { playback.setPlaying(false); playback.setFrame(value); }} /><p className="demo-readout" role="status">{step.explanation}</p><DemoActions onReset={reset}><Button disabled={playback.reducedMotion || playback.frame === steps.length - 1} onClick={() => playback.setPlaying(value => !value)}>{playback.playing ? 'Pause' : 'Play steps'}</Button><Button disabled={playback.frame === steps.length - 1} onClick={() => { playback.setPlaying(false); playback.setFrame(value => value + 1); }}>Next step</Button></DemoActions></> : <><RangeControl label="Sample bag capacity" value={capacity} min={0} max={12} onChange={setCapacity} /><DemoFigure label="The solver chooses each sample item at most once, maximizing value within the capacity."><Diagram label={`Knapsack selects value ${optimum.value} within capacity ${capacity}`}>{ALGORITHM_ITEMS.map((item, index) => <g key={item.name} transform={`translate(${38 + index * 190} 90)`}><rect width="154" height="190" fill={optimum.selected.includes(index) ? RED : STEEL} /><text x="77" y="58" textAnchor="middle" fontSize="40" fill={optimum.selected.includes(index) ? PAPER : INK}>{item.name}</text><text x="77" y="110" textAnchor="middle" fontSize="23" fill={optimum.selected.includes(index) ? PAPER : INK}>Weight {item.weight}</text><text x="77" y="148" textAnchor="middle" fontSize="23" fill={optimum.selected.includes(index) ? PAPER : INK}>Value {item.value}</text></g>)}</Diagram></DemoFigure><p className="demo-readout" role="status">Selected {optimum.selected.map(index => ALGORITHM_ITEMS[index].name).join(', ') || 'no items'} · weight {optimum.weight}/{capacity} · best sample value {optimum.value}</p><DemoActions onReset={reset} /></>}
  </div>;
}

function EcoSip() {
  const [viewport, setViewport] = useState('Phone'); const mobile = viewport === 'Phone';
  const width = mobile ? 260 : viewport === 'Tablet' ? 480 : 640;
  return <div className="demo-layout"><div className="demo-controls"><label>Illustrated viewport<select value={viewport} onChange={event => setViewport(event.target.value)}>{['Phone', 'Tablet', 'Desktop'].map(value => <option key={value}>{value}</option>)}</select></label></div>
    <DemoFigure label="Original sample composition, scaled to fit; this is a responsive-layout lesson, not a product screenshot."><div style={{ width, maxWidth: '100%', margin: 'auto', background: PAPER, color: INK, padding: 22 }}><div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, marginBottom: 28 }}><strong>EcoSip</strong><span>{mobile ? 'Menu' : 'Collection · Our approach'}</span></div><div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.2fr 1fr', gap: 18, alignItems: 'center' }}><div><p style={{ fontSize: 32, lineHeight: 1.05, fontWeight: 600 }}>A thoughtful daily object.</p><p style={{ fontSize: 14, marginTop: 14 }}>Sample copy reflows with its container.</p><div style={{ padding: '12px 16px', marginTop: 18, background: RED, color: PAPER, fontSize: 14, width: 'fit-content' }}>Explore the concept</div></div><svg viewBox="0 0 150 210" role="img" aria-label="Illustrative reusable bottle" style={{ width: '100%', maxWidth: 150, margin: 'auto' }}><rect x="53" y="12" width="44" height="26" fill={RED} /><path d="M49 38h52v29l17 21v102H32V88l17-21Z" fill={INK} /><path d="M44 115h62v49H44Z" fill={PAPER} /><text x="75" y="145" textAnchor="middle" fontSize="16" fill={INK}>EcoSip</text></svg></div></div></DemoFigure>
    <p className="demo-readout" role="status">{viewport}: {width}px illustrated width. {mobile ? 'Navigation collapses and content stacks into one column.' : 'Navigation expands and copy sits alongside the product illustration.'}</p><DemoActions onReset={() => setViewport('Phone')} />
  </div>;
}

function MotionStudy({ active }: { active: boolean }) {
  const clip = useId(); const playback = useDemoPlayback(active, 61);
  const progress = playback.frame / 60; const split = Math.max(0, Math.min(1, (progress - .2) / .8));
  return <div className="demo-layout"><DemoFigure label="An abstract breakdown of the diagonal reveal: anticipation, cut, then separation."><svg viewBox="0 0 800 380" role="img" aria-label="Steppable diagonal reveal study"><defs><clipPath id={clip}><rect width="800" height="380" /></clipPath></defs><g clipPath={`url(#${clip})`}><rect width="800" height="380" fill={PAPER} /><text x="400" y="218" textAnchor="middle" fontSize="76" fontWeight="600" fill={INK}>REVEAL</text><path d={`M${-500 - split * 700} 0H${600 - split * 700}L${400 - split * 700} 380H${-500 - split * 700}Z`} fill={INK} /><path d={`M${600 + split * 700} 0h700v380H${400 + split * 700}Z`} fill={INK} />{progress < .25 && <path d={`M${-150 + progress * 3200} 0l-200 380`} stroke={RED} strokeWidth="12" />}</g></svg></DemoFigure><RangeControl label="Reveal timeline" min={0} max={60} value={playback.frame} format={value => `${Math.round(value / 60 * 100)}%`} onChange={value => { playback.setPlaying(false); playback.setFrame(value); }} /><p className="demo-readout" role="status">{progress < .2 ? 'Anticipation: a single cut establishes direction.' : progress < .85 ? 'Separation: diagonal panels open to reveal the content.' : 'Rest: content remains readable after the animation ends.'}</p><DemoActions onReset={() => { playback.setPlaying(false); playback.setFrame(0); }}><Button disabled={playback.reducedMotion || playback.frame === 60} onClick={() => playback.setPlaying(value => !value)}>{playback.playing ? 'Pause' : 'Play reveal'}</Button><Button disabled={playback.frame === 60} onClick={() => { playback.setPlaying(false); playback.setFrame(value => Math.min(value + 5, 60)); }}>Step forward</Button></DemoActions></div>;
}

interface SampleTab { id: number; history: string[]; cursor: number }
function BrowserStudy() {
  const [tabs, setTabs] = useState<SampleTab[]>([{ id: 1, history: ['Home'], cursor: 0 }]); const [active, setActive] = useState(1); const [next, setNext] = useState(2);
  const [blocking, setBlocking] = useState(true); const [requested, setRequested] = useState(false); const [downloads, setDownloads] = useState(0);
  const tab = tabs.find(item => item.id === active)!; const title = tab.history[tab.cursor];
  const updateTab = (change: (tab: SampleTab) => SampleTab) => setTabs(current => current.map(item => item.id === active ? change(item) : item));
  const reset = () => { setTabs([{ id: 1, history: ['Home'], cursor: 0 }]); setActive(1); setNext(2); setBlocking(true); setRequested(false); setDownloads(0); };
  return <div className="demo-layout"><div className="demo-actions" role="group" aria-label="Sample browser tabs">{tabs.map(item => <button type="button" className="demo-button" key={item.id} aria-pressed={item.id === active} onClick={() => setActive(item.id)}>Tab {item.id}: {item.history[item.cursor]}</button>)}</div><DemoFigure label="A schematic of browser responsibilities; no websites are loaded and no files are downloaded."><Diagram label={`Sample tab showing ${title} with ${tab.history.length} history entries`}><rect x="60" y="58" width="440" height="250" fill={INK} /><text x="94" y="115" fontSize="22" fill={PAPER}>Active sample document</text><text x="94" y="190" fontSize="49" fill={PAPER}>{title}</text><text x="94" y="263" fontSize="21" fill={PAPER}>History {tab.cursor + 1}/{tab.history.length}</text><path d="M504 173h56m-11-11 13 11-13 11" fill="none" stroke={RED} strokeWidth="5" /><text x="585" y="152" fontSize="21" fill={INK}>Request filter</text><rect x="568" y="176" width="178" height="63" fill={blocking ? RED : STEEL} /><text x="657" y="215" textAnchor="middle" fontSize="24" fill={blocking ? PAPER : INK}>{blocking ? 'Blocking on' : 'Blocking off'}</text></Diagram></DemoFigure>
    <div className="demo-controls"><label className="demo-check"><input type="checkbox" checked={blocking} onChange={event => setBlocking(event.target.checked)} />Block the sample tracker request</label></div><p className="demo-readout" role="status">{requested ? `Sample document: allowed. Sample tracker: ${blocking ? 'blocked' : 'allowed'}. ` : 'Send sample requests to inspect the filter. '}{downloads ? `${downloads} sample download events queued; no real file transfer.` : ''}</p>
    <DemoActions onReset={reset}><Button disabled={tabs.length >= 3} onClick={() => { setTabs(current => [...current, { id: next, history: ['Docs'], cursor: 0 }]); setActive(next); setNext(value => value + 1); }}>New sample tab</Button><Button disabled={tabs.length === 1} onClick={() => { const remaining = tabs.filter(item => item.id !== active); setTabs(remaining); setActive(remaining[0].id); }}>Close tab</Button><Button disabled={!tab.cursor} onClick={() => updateTab(item => ({ ...item, cursor: item.cursor - 1 }))}>Back</Button><Button disabled={tab.cursor === tab.history.length - 1} onClick={() => updateTab(item => ({ ...item, cursor: item.cursor + 1 }))}>Forward</Button><Button disabled={title === 'Gallery'} onClick={() => updateTab(item => ({ ...item, history: [...item.history.slice(0, item.cursor + 1), 'Gallery'], cursor: item.cursor + 1 }))}>Visit sample gallery</Button><Button onClick={() => setRequested(true)}>Send sample requests</Button><Button onClick={() => setDownloads(value => value + 1)}>Sample download</Button></DemoActions>
  </div>;
}

function RenderingStudy({ active }: { active: boolean }) {
  const [angle, setAngle] = useState(0); const [frames, setFrames] = useState(1); const [message, setMessage] = useState('Initial illustration drawn; idle until an input changes it.');
  const [motion, setMotion] = useState(false); const playback = useDemoPlayback(active && motion, 31);
  const rotate = (value: number) => { if (value !== angle) { setAngle(value); setFrames(current => current + 1); setMessage('A changed angle requested one illustrated frame; now idle again.'); } };
  const reset = () => { setAngle(0); setFrames(1); setMotion(false); playback.setPlaying(false); playback.setFrame(0); setMessage('Initial illustration drawn; idle until an input changes it.'); };
  return <div className="demo-layout"><DemoFigure label="Counters belong to this educational state model, not a GPU benchmark or live page performance measurement."><Diagram label="Input-triggered rendering illustration"><g transform={`translate(400 180) rotate(${angle + (motion && !playback.reducedMotion ? Math.sin(playback.frame / 30 * Math.PI) * 8 : 0)})`}><path d="M-235-10h390l80-25-62 40h-408Z" fill={STEEL} /><path d="M-235 3h408l62-38" fill="none" stroke={INK} strokeWidth="3" /><rect x="-310" y="-14" width="80" height="28" fill={INK} /><path d="M-232-25v50" stroke={RED} strokeWidth="10" /></g><text x="40" y="315" fontSize="24" fill={INK}>{frames} illustrated frame request{frames === 1 ? '' : 's'} from changed inputs</text></Diagram></DemoFigure><RangeControl label="Illustration angle" min={-25} max={25} value={angle} format={value => `${value}°`} onChange={rotate} /><p className="demo-readout" role="status">{message}</p><p className="demo-explanation">An on-demand scene schedules work when its visible state changes. Reduced-motion mode keeps this illustration still while manual angle changes remain available.</p><DemoActions onReset={reset}><Button onClick={() => rotate(angle >= 20 ? -20 : angle + 5)}>Rotate one step</Button><Button onClick={() => setMessage('The angle did not change: this model requests no additional frame.')}>Repeat unchanged input</Button><Button disabled={playback.reducedMotion} onClick={() => { setMotion(true); playback.setFrame(0); playback.setPlaying(true); }}>Preview optional motion</Button><Button disabled={!playback.playing} onClick={() => playback.setPlaying(false)}>Pause motion</Button></DemoActions></div>;
}

export default function EverydayDemos({ id, active }: { id: string; active: boolean }) {
  switch (id) {
    case 'irc': return <DataTools />;
    case 'inventory-management-system': return <Inventory />;
    case 'weather-system': return <Weather />;
    case 'chemistry-manual-digitizer': return <Chemistry />;
    case 'hospital-management': return <Hospital />;
    case 'computer-guesses-your-the-number': return <Suspense fallback={<p className="demo-loading" role="status">Loading Seven questions…</p>}><SevenQuestions /></Suspense>;
    case 'data-structure-assignments': return <CircularQueue />;
    case 'daa-assignments': return <Algorithms active={active} />;
    case 'ecosip': return <EcoSip />;
    case 'bleach-portfolio': return <MotionStudy active={active} />;
    case 'web-browser': return <BrowserStudy />;
    case 'portfolio-website': return <RenderingStudy active={active} />;
    default: return null;
  }
}
