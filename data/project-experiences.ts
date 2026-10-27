import type { EducationalExplainer, EngineeringStory } from '../types.ts';

// Educational views use synthetic examples; engineering stories follow reviewed public documentation.
export const PUBLIC_EXPERIENCES: Record<string, {
  explainer: EducationalExplainer;
  caseStudy?: EngineeringStory;
}> = {
  'tt-trajectory-engine': {
    explainer: {
      family: 'research', title: 'Shape a trajectory',
      summary: 'Change angle and spin in a simplified flight illustration, then inspect the path one step at a time.',
      lesson: 'This illustrates how initial conditions affect a path. It does not run the tracking engine, measure real spin, or reconstruct airborne ball height.',
    },
    caseStudy: {
      reviewedAt: '2026-10-27',
      problem: 'A recording needs consistent analysis and understandable review controls, even when playback is paused, accelerated, or moved to another frame.',
      decisions: [
        'Keep sequential recording analysis in an independent worker and save indexed frame results, separating analysis coverage from playback speed.',
        'Use explicit camera authorization and source/model selection rather than opening an input implicitly.',
        'Show synchronized footage and table-plane views while keeping the separate physics sandbox identifiable as an experiment.',
      ],
      evidence: [
        'The public repository documents the Electron/Next.js desktop shell, C++/OpenCV/TensorRT engine, indexed recording workflow, and reviewed training captures.',
        'The application capture in this portfolio is an actual desktop artifact from the public repository.',
      ],
      limitations: [
        'Table-plane projections do not measure airborne ball height.',
        'Real-world speed and spin accuracy remain unvalidated.',
        'Native inference requires compatible NVIDIA hardware; there is no implemented CPU fallback.',
      ],
    },
  },
  multigpu: {
    explainer: {
      family: 'research', title: 'Recover a training run',
      summary: 'Save a checkpoint, interrupt a sample run, and explore what can be resumed or restarted.',
      lesson: 'This is a workflow illustration using one active resource. It does not launch training, access provider accounts, combine GPU memory, or produce a model.',
    },
    caseStudy: {
      reviewedAt: '2026-10-27',
      problem: 'A training workflow must retain usable progress and verified exports when compute access or result delivery is interrupted.',
      decisions: [
        'Bind launch to reviewed inputs and explicit resource order using persisted drafts and preview digests.',
        'Use atomic checkpoints, worker heartbeats, and compatibility checks to support recovery.',
        'Separate implemented provider adapters from the research directory so possible services are not presented as working integrations.',
      ],
      evidence: [
        'Version 0.5.0 documentation describes local CPU/CUDA training, Kaggle, Modal, and Lightning adapters, recovery paths, and verified exports.',
        'The documented workflow includes held-out evaluation and artifact checks; these describe project capabilities rather than an independent performance benchmark.',
      ],
      limitations: [
        'Each attempt uses one resource at a time; synchronous cross-provider training and pooled GPU memory remain future work.',
        'Provider eligibility, allowances, and clean-machine installation still need qualification in the intended environment.',
      ],
    },
  },
  'autonomous-driving-prediction': {
    explainer: {
      family: 'research', title: 'Compare possible futures',
      summary: 'Scrub a synthetic traffic scene and compare six coordinated future paths for its actors.',
      lesson: 'The paths are constructed examples for understanding joint uncertainty. No forecasting model runs here, and the illustration supplies no driving-safety score.',
    },
    caseStudy: {
      reviewedAt: '2026-10-27',
      problem: 'Actors share a road scene, so a forecast must represent their interaction and multiple plausible futures rather than treating each path in isolation.',
      decisions: [
        'Combine temporal history, an interaction graph, and vector-map information to predict six shared scene futures.',
        'Preserve scenario-level partitions and compare constant-velocity baselines, ablations, calibration, and stress cases.',
        'Keep the defined near-conflict proxy distinct from a validated measure of driving safety.',
      ],
      evidence: [
        'The public documentation describes Argoverse 2 ingestion, the local FastAPI/React scenario workspace, reproducible partitions, and reference forecasting results.',
        'Baseline, failure-analysis, and robustness workflows are documented with their original scope and qualification limits.',
      ],
      limitations: [
        'Proximity scores and footprint overlaps are research outputs, not safety guarantees.',
        'Expanded training, calibrated-risk validation, and installed-application qualification remain incomplete.',
        'Some later workflows and generated assets are local-only and are not supplied by a fresh clone.',
      ],
    },
  },
  'neural-world-model': {
    explainer: {
      family: 'research', title: 'Explore prediction error',
      summary: 'Compare reference disc motion with an imperfect prediction and an adjustable residual correction.',
      lesson: 'These synthetic paths illustrate accumulated error and correction. They are not neural inference, measured benchmark results, or proof that a learned model outperforms fitted physics.',
    },
    caseStudy: {
      reviewedAt: '2026-10-27',
      problem: 'An imperfect physics model accumulates prediction error. The research asks whether learned corrections can improve its rollouts against strong fitted-physics baselines.',
      decisions: [
        'Observe four RGB frames of three moving discs, then compare predictions over several rollout lengths under supplied actions.',
        'Compare constant velocity, an imperfect simulator, fitted physics, recurrent dynamics, and residual corrections within one workflow.',
        'Keep held-out calibration, causal backtesting, and immutable serving bundles separate from visual demonstrations.',
      ],
      evidence: [
        'The repository documents a complete smoke pipeline, seeded synthetic data, Simulation/Forecast/Backtest workspaces, and checksum-verified serving bundles.',
        'Recorded smoke evidence is explicitly undertrained; the documented full experiment stopped at epoch 34 of 45.',
      ],
      limitations: [
        'The smoke results do not establish a performance advantage over fitted physics.',
        'Full training, full evaluation, and publication remain unfinished.',
        'Real-video large-model inference and benchmark feasibility remain unverified.',
      ],
    },
  },
  fixmycampus: {
    explainer: {
      family: 'research', title: 'Follow an issue',
      summary: 'Move a fictional campus issue through its lifecycle and switch perspectives between the people handling it.',
      lesson: 'This is a local role-and-workflow illustration with sample data. It does not create a complaint, authenticate a user, or contact a campus service.',
    },
    caseStudy: {
      reviewedAt: '2026-10-27',
      problem: 'A campus issue needs a visible route from submission to the responsible department, with an accountable resolution history and controlled access to evidence.',
      decisions: [
        'Represent reporting, verification, assignment, resolution, and eligible reopening as role-based workflows.',
        'Preserve assignment and resolution cycles while transactional updates reject stale edits.',
        'Protect confidential evidence and use durable notifications plus a retrying email outbox.',
      ],
      evidence: [
        'The public README documents the accepted single-campus service-desk scope, React/TypeScript client, Express API, MySQL migrations, automated checks, and deployment configuration.',
        'Department reporting, service-level tracking, protected downloads, and authorized exports are described in the operational documentation.',
      ],
      limitations: [
        'The application is scoped to one campus with institutional registration and explicit permissions.',
        'Documented checks and deployment configuration are not a guarantee of current hosted availability.',
      ],
    },
  },
  famgpslink: {
    explainer: {
      family: 'research', title: 'Choose who can see',
      summary: 'Change sharing, audience, and measurement age using fictional location markers.',
      lesson: 'The map uses sample positions and requests no device location. It illustrates opt-in visibility and freshness, not a live family map or real background collection.',
    },
    caseStudy: {
      reviewedAt: '2026-10-27',
      problem: 'Family location sharing needs explicit consent, restricted audiences, and useful information about how old a measurement is, including during device recovery and offline periods.',
      decisions: [
        'Use owner-approved device profiles, opt-in sharing, and audience-restricted connections.',
        'Keep native Android and iPhone collectors separate from the shared Flutter interface, subject to platform restrictions.',
        'Buffer only the latest encrypted offline fix and use revision checks to prevent stale uploads from overriding newer sharing choices.',
      ],
      evidence: [
        'The repository documents pilot builds, Firebase access-rule tests, upload-race checks, native collectors, and cloud build workflows.',
        'The documented design intentionally retains no route history and supports device recovery that revokes the previous device.',
      ],
      limitations: [
        'Phone permissions, power management, and background restrictions can interrupt collection.',
        'Physical-device tracking, prolonged background behavior, and battery acceptance remain pilot requirements.',
        'Pilot builds do not establish a store-ready release.',
      ],
    },
  },
  irc: {
    explainer: {
      family: 'everyday', title: 'Filter a dataset',
      summary: 'Filter sample hashtag records and watch their counts change in a simple chart.',
      lesson: 'This illustrates local filtering and aggregation with invented records. It does not query Instagram or process personal account data.',
    },
  },
  'inventory-management-system': {
    explainer: {
      family: 'everyday', title: 'Balance an inventory',
      summary: 'Sort sample stock, change quantities, and inspect the resulting inventory value.',
      lesson: 'The items and prices are sample data for understanding sorting and valuation. They are not records from an actual inventory system.',
    },
  },
  'weather-system': {
    explainer: {
      family: 'everyday', title: 'Read weather data',
      summary: 'Switch between sample locations and units to explore weather and air-quality fields.',
      lesson: 'Weather values are fixed examples rather than live conditions. The demonstration makes no external weather or location requests.',
    },
  },
  'chemistry-manual-digitizer': {
    explainer: {
      family: 'everyday', title: 'Structure an experiment',
      summary: 'Edit a sample record and compare its structured fields with JSON, including validation feedback.',
      lesson: 'This illustrates organizing a manually entered record. It does not perform OCR, interpret a laboratory procedure, or validate an experiment scientifically.',
    },
  },
  'hospital-management': {
    explainer: {
      family: 'everyday', title: 'Inspect a linked queue',
      summary: 'Add fictional queue entries, move an entry forward, and remove the front entry.',
      lesson: 'The entries illustrate linked-list operations. They contain no patient information and do not represent clinical triage decisions.',
    },
  },
  'computer-guesses-your-the-number': {
    explainer: {
      family: 'everyday', title: 'Think in binary',
      summary: 'Answer seven yes-or-no questions and see how binary positions reveal a number from 1 to 100.',
      lesson: 'Each answer contributes a bit to the result. This is deterministic deduction rather than machine-learning prediction.',
    },
  },
  'data-structure-assignments': {
    explainer: {
      family: 'everyday', title: 'Wrap a circular queue',
      summary: 'Enqueue and dequeue sample items while following the head, tail, and wraparound.',
      lesson: 'A bounded ring buffer can reuse storage without moving every item. This small illustration focuses on that one data-structure exercise.',
    },
  },
  'daa-assignments': {
    explainer: {
      family: 'everyday', title: 'Step through algorithms',
      summary: 'Inspect merge-sort stages and change the capacity of a small knapsack problem.',
      lesson: 'The examples illustrate divide-and-conquer and dynamic programming. Their small inputs are teaching fixtures, not performance benchmarks.',
    },
  },
  ecosip: {
    explainer: {
      family: 'everyday', title: 'Resize a composition',
      summary: 'Switch a sample product composition between phone, tablet, and desktop widths.',
      lesson: 'This is a responsive-layout study using illustrative content. It supplies no sales, certification, or environmental-impact evidence.',
    },
  },
  'bleach-portfolio': {
    explainer: {
      family: 'everyday', title: 'Break down a reveal',
      summary: 'Play, pause, and step through an abstract diagonal reveal to inspect its stages.',
      lesson: 'The animation illustrates masking and timing without reproducing an application capture. Manual controls remain available with reduced motion.',
    },
  },
  'web-browser': {
    explainer: {
      family: 'everyday', title: 'Follow browser actions',
      summary: 'Explore a schematic of tabs, history, downloads, and blocking using predefined actions.',
      lesson: 'This is a browser-workflow illustration, not an embedded browser. It opens no remote pages and makes no tracking-protection guarantee.',
    },
  },
  'portfolio-website': {
    explainer: {
      family: 'everyday', title: 'Render with purpose',
      summary: 'Trigger visual updates and compare active, idle, and reduced-motion presentation.',
      lesson: 'The demonstration explains input-driven rendering and motion preferences. Its states are illustrative, not measured battery or frame-rate benchmarks.',
    },
  },
};
