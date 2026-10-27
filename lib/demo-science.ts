export interface Point { x: number; y: number }
export interface FlightPoint extends Point { bounced: boolean }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// A small teaching model, deliberately independent of measured tracking and native inference.
export function illustrativeFlight(angle: number, spin: number, steps = 90): FlightPoint[] {
  const theta = clamp(angle, 5, 45) * Math.PI / 180;
  const turn = clamp(spin, -1, 1);
  let x = 0;
  let y = .55;
  let vx = 4.5 * Math.cos(theta);
  let vy = 4.5 * Math.sin(theta);
  const result: FlightPoint[] = [{ x, y, bounced: false }];
  for (let index = 0; index < steps; index++) {
    const dt = .022;
    vy -= 9.81 * (1 + turn * .14) * dt;
    vx *= .997;
    x += vx * dt;
    y += vy * dt;
    const bounced = y < 0 && Math.abs(vy) > .65;
    if (bounced) { y = -y; vy = Math.abs(vy) * .68; vx *= .92; }
    else if (y < 0) { y = 0; vy = 0; }
    result.push({ x, y, bounced });
  }
  return result;
}

export function pointsPath(points: Point[]): string {
  return points.map((point, index) => `${index ? 'L' : 'M'}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');
}

export interface TrainingState {
  stage: 'ready' | 'running' | 'interrupted' | 'complete' | 'exported';
  step: number;
  checkpoint: number | null;
  resource: 'Primary' | 'Fallback';
  notice: string;
}
export type TrainingAction = 'start' | 'advance' | 'checkpoint' | 'interrupt' | 'resume' | 'export';
export const INITIAL_TRAINING: TrainingState = {
  stage: 'ready', step: 0, checkpoint: null, resource: 'Primary',
  notice: 'Start the sample workflow, then save a checkpoint before interrupting it.',
};

export function trainingTransition(state: TrainingState, action: TrainingAction): TrainingState {
  if (action === 'start' && state.stage === 'ready') return { ...state, stage: 'running', notice: 'One primary resource is active. Advance the illustrative training steps.' };
  if (action === 'advance' && state.stage === 'running') {
    const step = Math.min(5, state.step + 1);
    return { ...state, step, stage: step === 5 ? 'complete' : 'running', notice: step === 5 ? 'Training steps are complete. The export stage is now available.' : `Illustrative step ${step} of 5. Only a saved checkpoint survives interruption.` };
  }
  if (action === 'checkpoint' && state.stage === 'running' && state.step > 0) return { ...state, checkpoint: state.step, notice: `Checkpoint saved at step ${state.step}. Later unsaved work can be lost.` };
  if (action === 'interrupt' && state.stage === 'running') return { ...state, stage: 'interrupted', notice: state.checkpoint === null ? 'Interrupted without a checkpoint. The fallback must start again.' : `Interrupted. Recovery will return to saved step ${state.checkpoint}.` };
  if (action === 'resume' && state.stage === 'interrupted') return { ...state, stage: 'running', resource: 'Fallback', step: state.checkpoint ?? 0, notice: state.checkpoint === null ? 'Fallback resource active, restarting at step 0.' : `Fallback resource active, continuing from checkpoint ${state.checkpoint}.` };
  if (action === 'export' && state.stage === 'complete') return { ...state, stage: 'exported', notice: 'Export stage reached. This illustration creates no model files or compute jobs.' };
  return state;
}

export const FUTURES = ['Both continue', 'A turns', 'B turns', 'A yields', 'B yields', 'Both slow'] as const;
export function trafficActors(future: number, frame: number): [Point, Point] {
  const t = clamp(frame, 0, 60) / 60;
  const mode = clamp(Math.round(future), 0, 5);
  const aTime = mode === 3 ? Math.max(0, t - .28) : mode === 5 ? t * .64 : t;
  const bTime = mode === 4 ? Math.max(0, t - .28) : mode === 5 ? t * .64 : t;
  const a = mode === 1
    ? { x: 100 + 350 * Math.min(1, aTime * 1.8), y: 220 - Math.max(0, aTime - .55) / .45 * 170 }
    : { x: 100 + 590 * aTime, y: 220 };
  const b = mode === 2
    ? { x: 470 - Math.max(0, bTime - .48) / .52 * 320, y: 330 - Math.min(.48, bTime) / .48 * 150 }
    : { x: 470, y: 330 - 290 * bTime };
  return [a, b];
}

function reflect(value: number, min: number, max: number): number {
  const span = max - min;
  const phase = ((value - min) % (span * 2) + span * 2) % (span * 2);
  return min + (phase <= span ? phase : span * 2 - phase);
}
export function discForecast(disc: number, frame: number, bias: number, correction: number): { reference: Point; imperfect: Point; corrected: Point } {
  const seeds = [{ x: 125, y: 100, vx: 7, vy: 3 }, { x: 420, y: 260, vx: -5, vy: -4 }, { x: 650, y: 100, vx: -6, vy: 4 }];
  const seed = seeds[clamp(Math.round(disc), 0, 2)];
  const t = clamp(frame, 0, 50);
  const drift = clamp(bias, -1, 1);
  const sample = (error: number): Point => ({
    x: reflect(seed.x + seed.vx * t + error * t * 1.7, 45, 755),
    y: reflect(seed.y + seed.vy * t + error * t * .9, 45, 335),
  });
  return { reference: sample(0), imperfect: sample(drift), corrected: sample(drift * (1 - clamp(correction, 0, 1))) };
}

export type CampusStage = 'Submitted' | 'Verified' | 'Assigned' | 'In progress' | 'Resolved';
export type CampusRole = 'Reporter' | 'Campus incharge' | 'Department officer';
export const CAMPUS_STAGES: CampusStage[] = ['Submitted', 'Verified', 'Assigned', 'In progress', 'Resolved'];
export const CAMPUS_NEXT: Record<CampusStage, { role: CampusRole; label: string; to: CampusStage }> = {
  Submitted: { role: 'Campus incharge', label: 'Verify issue', to: 'Verified' },
  Verified: { role: 'Campus incharge', label: 'Assign department', to: 'Assigned' },
  Assigned: { role: 'Department officer', label: 'Start work', to: 'In progress' },
  'In progress': { role: 'Department officer', label: 'Resolve issue', to: 'Resolved' },
  Resolved: { role: 'Reporter', label: 'Reopen issue', to: 'Assigned' },
};
export function advanceCampus(stage: CampusStage, role: CampusRole): CampusStage {
  return CAMPUS_NEXT[stage].role === role ? CAMPUS_NEXT[stage].to : stage;
}

export interface SharingSettings { sharing: boolean; approved: boolean; ownerOnly: boolean; viewer: 'Owner' | 'Family member' | 'Unconnected visitor' }
export function canViewLocation(settings: SharingSettings): boolean {
  return settings.sharing && settings.approved && (settings.viewer === 'Owner' || (!settings.ownerOnly && settings.viewer === 'Family member'));
}
