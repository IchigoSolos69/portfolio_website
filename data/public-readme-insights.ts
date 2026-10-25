// Reviewed against each repository's README on 25 October 2026.
// Repositories without a README use the previously inspected source instead.
export interface PublicReadmeInsight {
  description: string;
  highlights: string[];
  limitations?: string[];
  progressBrief: string;
}

export const PUBLIC_README_INSIGHTS: Record<string, PublicReadmeInsight> = {
  'TT-Trajectory-Engine': {
    description: 'A local Windows application that turns table-tennis recordings and explicitly authorized camera footage into synchronized footage, tracking overlays, and spatial views. An Electron shell connects a Next.js interface to a C++ engine built with OpenCV, TensorRT, and CUDA. Separate ball and scene detectors feed tracking, table geometry, and event review.\n\nRecording analysis runs sequentially in an independent worker and saves indexed frame results, so presentation controls can pause, seek, or change speed without silently skipping analytical frames. Compatible results are cached for later review. A separate physics sandbox explores gravity, drag, spin forces, and bounces; training tools support reviewed captures and annotations.\n\nThe application runs locally, while high-precision measurement acceptance remains unfinished. Its spatial views project observations onto the table plane, and model resources must be supplied separately from a clean source checkout.',
    highlights: ['Indexed recording analysis separated from playback', 'Authorized live capture and explicit source/model controls', 'Synchronized footage, table-plane views, and event review', 'Separate physics sandbox and reviewed training captures'],
    limitations: ['Projected positions do not reconstruct airborne ball height.', 'Real-world speed and spin accuracy remain unvalidated.', 'Native inference requires compatible NVIDIA hardware; no CPU fallback is implemented.'],
    progressBrief: 'Local desktop analysis works; measurement validation and full recording acceptance remain open.',
  },
  MultiGPU: {
    description: 'A Windows desktop application for preparing training runs, choosing compute resources, monitoring progress, recovering checkpoints, and retaining verified model exports locally. Supported recipes cover numeric classification and image classification, with an extension interface for trusted Python training scripts.\n\nThe workflow combines local CPU/CUDA execution with implemented Kaggle, Modal, and Lightning adapters, plus assisted notebook and result-import routes. Reviewed input digests, persisted drafts, worker heartbeats, atomic checkpoints, and artifact checks support recovery when a run or delivery is interrupted. Each attempt uses one resource at a time, with compatible continuation and ordered fallback choices.\n\nVersion 0.4.4 also includes a separately labeled provider research directory. Research records describe possible services and eligibility; they do not imply implemented connectors, guaranteed free capacity, or pooled GPU memory.',
    highlights: ['Guided training with explicit resource ordering', 'Atomic checkpoints and compatible interruption recovery', 'Hash-verified exports and held-out evaluation', 'Implemented adapters separated from provider research'],
    limitations: ['Synchronous cross-provider training and combined GPU memory are future work.', 'Provider access and actual account allowances require independent checks.', 'Clean-machine first-install qualification remains outstanding.'],
    progressBrief: 'Version 0.4.4 documents training, recovery, and exports; distributed training remains future work.',
  },
  'Autonomous-Driving-Prediction': {
    description: 'Interaction Lab is a desktop research application for examining how vehicles, pedestrians, and cyclists may move together. A temporal Transformer, interaction graph, and vector-map encoder predict six shared probabilistic futures from observed histories and road geometry. The React scenario canvas supports playback, actor inspection, baseline comparison, and exported research results through a local Python/FastAPI service.\n\nThe research workflow ingests Argoverse 2 scenarios, preserves scenario-level partitions, compares model ablations, and studies forecasting failures and robustness. Its proximity head estimates a defined near-conflict proxy rather than a validated measure of driving safety.\n\nThe reference experiment has recorded results, but the expanded study and installed-application qualification remain incomplete. Later isolated failure-analysis and training workflows are documented separately and are not all supplied by a fresh clone.',
    highlights: ['Joint actor forecasting with six shared scene futures', 'Real Argoverse 2 ingestion and map-aware inspection', 'Baseline, ablation, and stress-test comparisons', 'Reproducible scenario partitions and result exports'],
    limitations: ['Proximity scores and footprint overlaps are research outputs, not safety guarantees.', 'Expanded training and calibrated-risk validation remain incomplete.', 'Some later experimental workflows and generated assets are local-only.'],
    progressBrief: 'Reference forecasting results are documented; expanded study and release qualification remain incomplete.',
  },
  'Neural-World-Model': {
    description: 'A reproducible research prototype that observes four RGB frames of three moving discs and predicts their future motion under supplied actions. It compares learned recurrent dynamics against constant velocity, an imperfect simulator, fitted physics, and learned residual corrections over multiple rollout lengths. The central question is whether learned corrections improve an imperfect physics model.\n\nA local FastAPI and React application provides Simulation, Forecast, and Backtest workspaces. The synthetic workflow includes seeded data generation, held-out calibration, comparison videos, and immutable checksum-verified serving bundles. A separate real-video continuation track explores generated forecasts while keeping visual realism distinct from measured physical accuracy.\n\nThe smoke pipeline is complete but deliberately undertrained. The full experiment stopped at hybrid_2 epoch 34 of 45, and full evaluation and publication remain unfinished. Existing smoke evidence does not establish superiority over fitted physics.',
    highlights: ['Action-conditioned prediction from four observed frames', 'Learned, fitted-physics, and residual-model comparisons', 'Held-out calibration and causal backtesting', 'Immutable serving bundles and recorded inference-parity checks'],
    limitations: ['Smoke models are undertrained and do not support a performance advantage claim.', 'Full training was interrupted; full evaluation and publication are unfinished.', 'Real-video large-model inference and benchmark feasibility remain unverified.'],
    progressBrief: 'Smoke pipeline completed; full training stopped at epoch 34/45 and awaits completion and evaluation.',
  },
  FixMyCampus: {
    description: 'A single-campus complaint and service-desk application that carries an issue from submission through verification, departmental assignment, progress, resolution, and eligible reopening. Students, faculty, and staff track their own reports; campus incharge and department officers work within defined operational roles. Administrators manage routing, access, service-level settings, and reports.\n\nThe React and TypeScript client connects to an Express API and MySQL database. Complaint timelines retain assignment and resolution history, while transactional updates reject stale edits. Protected evidence downloads, confidential reporting, durable in-app notifications, and a retrying email outbox support the full workflow.\n\nThe README documents implementation against the accepted requirement set, automated checks, deployment configuration, and operational guidance. Its scope is a single campus, with institutional registration and explicit permissions rather than unrestricted public issue tracking.',
    highlights: ['Role-based reporting, assignment, resolution, and reopening', 'Service-level tracking with preserved resolution cycles', 'Protected evidence and confidential case access', 'Department reporting and authorized CSV/PDF exports'],
    limitations: ['Configured for a single-campus workflow and institutional registration.'],
    progressBrief: 'Accepted service-desk scope is implemented with documented tests and deployment configuration.',
  },
  FamGPSlink: {
    description: 'A family-location application with a shared Flutter interface and native Android and iPhone location collectors. Members join through owner-approved device profiles and choose when to enable sharing. The family map shows current locations with measurement age and accuracy, while owner-only connections restrict who can see a member.\n\nKotlin and Swift collectors operate subject to platform permissions and background restrictions. An encrypted buffer keeps only the latest offline fix; revision checks prevent obsolete uploads from replacing newer sharing settings. Firebase rules enforce audiences and device bindings, and recovery preserves the member profile while revoking the previous device.\n\nThe repository documents pilot builds, emulator and interface checks, and cloud build workflows. It intentionally stores no route history. Physical-device tracking, prolonged background behavior, and battery acceptance remain separate pilot requirements.',
    highlights: ['Opt-in sharing and owner-approved device recovery', 'Audience-restricted family and owner-only connections', 'Native collectors with encrypted latest-fix buffering', 'Firebase access-rule and upload-race tests'],
    limitations: ['Phone power restrictions can interrupt background collection.', 'Physical-device and 24-hour battery acceptance remain outstanding.', 'Pilot builds do not establish a store-ready release.'],
    progressBrief: 'Pilot builds and access-rule tests are documented; real-device tracking and battery checks remain open.',
  },
  IRC: {
    description: 'A Python toolkit for examining Instagram hashtag and profile data through command-line tools and a PyQt5 desktop interface. CSV import, filtering, frequency analysis, sorting, charts, and selected-result export turn tabular records into a repeatable analysis workflow.\n\nPandas handles the records and Matplotlib provides charts alongside interactive tables. The repository also documents QR scanning and CSV-output utilities. Its engineering focus is local data preparation and exploration; the portfolio does not treat the README\'s credential-storage wording as evidence of production-grade authentication.',
    highlights: ['Command-line and PyQt5 analysis interfaces', 'CSV filtering, frequency analysis, and export', 'Matplotlib charts and interactive tables', 'QR scanning utilities with CSV output'],
    progressBrief: 'Documented desktop and CLI toolkit for CSV analysis, charts, and QR utilities.',
  },
  'Web-Browser': {
    description: 'A custom Python desktop browser built with PyQt5 and QtWebEngine. It assembles tab management, standard navigation controls, an address bar, download prompts, status messages, and keyboard shortcuts into one application.\n\nThe README also documents blocking of common advertising and tracking domains. The useful engineering exercise is connecting an embedded browser engine to desktop controls and file handling; the project does not implement a new rendering engine or establish comprehensive tracking protection.',
    highlights: ['Tabbed QtWebEngine browsing', 'Navigation toolbar and keyboard shortcuts', 'Download handling and status feedback', 'Common-domain advertising and tracking blocking'],
    progressBrief: 'Desktop browser features are documented, including tabs, downloads, and domain blocking.',
  },
  'Inventory-Management-System': {
    description: 'A Python and PyQt5 desktop inventory application for maintaining item names, quantities, prices, and expiry dates in an editable table. Users can add or remove records, select items in bulk, sort by name, quantity, or price, and calculate the value of a selected inventory subset.\n\nCSV import and export provide the persistence and exchange workflow, including exports of selected items. The README documents a machine-specific default CSV path, so moving the application to another computer requires adjusting that location. This is a local desktop tool rather than a shared warehouse or transaction-processing service.',
    highlights: ['Editable stock records with expiry dates', 'Name, quantity, and price sorting', 'Whole-inventory and selected-item CSV exports', 'Selected-stock valuation and bulk controls'],
    limitations: ['The documented default inventory file path requires local configuration.'],
    progressBrief: 'Local inventory editing, CSV workflows, sorting, and valuation are documented.',
  },
  'Weather-System': {
    description: 'A Python and PyQt5 dashboard that combines location search, current weather, air quality, and forecast information. Nominatim resolves place names while Open-Meteo supplies weather data. The interface displays temperature, humidity, precipitation, wind, pressure, forecast highs and lows, sunrise and sunset, and UV information.\n\nThe project practices combining several API responses into a scrollable desktop presentation with weather icons, formatted units, input validation, and connection-error feedback. Favorite locations, historical charting, and CSV/JSON exports remain documented future enhancements.',
    highlights: ['Place-name search using Nominatim', 'Current weather and daily forecast details', 'Air-quality pollutant breakdown', 'Formatted units and connection-error feedback'],
    limitations: ['Favorites, historical charts, and data exports are planned enhancements.'],
    progressBrief: 'Weather, location search, air quality, and forecast dashboard are documented.',
  },
  'Chemistry-Manual-Digitizer': {
    description: 'A lightweight Python project for organizing chemistry experiment information as structured JSON records. Experiment names, steps, reagents, and observations can be kept in a format that a script can display or process, making manual material easier to browse and extend.\n\nThe current workflow uses the experiment JSON file and a command-line script. The README places graphical editing, OCR extraction from scanned manuals, additional export formats, and chemical-structure visualization on the future roadmap. The implemented scope is structured information handling, with manual digitization rather than automatic document recognition.',
    highlights: ['JSON-backed experiment records', 'Structured steps, reagents, and observations', 'Lightweight Python command-line processing'],
    limitations: ['OCR, graphical editing, and richer exports are future enhancements.'],
    progressBrief: 'Structured JSON experiment workflow exists; OCR and a graphical editor remain planned.',
  },
  'Hospital-Management': {
    description: 'A C++ console exercise that represents an emergency-room patient queue with a singly linked list. The menu supports adding patient records, removing the front entry, moving an existing entry to the front, displaying the queue, searching by patient ID, and updating recorded details.\n\nThe project connects pointer-based data structures to a concrete record-management workflow. Database persistence, a graphical interface, and remote access are listed as future enhancements; it is presented here as a learning project rather than a production hospital system.',
    highlights: ['Singly linked-list patient queue', 'Manual priority changes and front-of-queue removal', 'Patient-ID search and record updates'],
    limitations: ['Database persistence and graphical or web interfaces are future work.'],
    progressBrief: 'Console linked-list queue exercise with search, record updates, and manual prioritization.',
  },
  'Computer-Guesses-your-the-Number': {
    description: 'A Python command-line game that identifies a number from 1 to 100 through at most seven yes/no questions. Each displayed set corresponds to a binary position, so the answers reconstruct the chosen number using bitwise reasoning.\n\nText prompts, an ASCII introduction, and timed output make the underlying deduction visible. The project is a focused demonstration of binary representation and interactive input handling, rather than a machine-learning prediction system.',
    highlights: ['Bitwise deduction over numbers 1–100', 'At most seven yes/no questions', 'Text prompts with an animated ASCII introduction'],
    progressBrief: 'Focused command-line game demonstrating binary deduction in up to seven questions.',
  },
  'Data-Structure-Assignments': {
    description: 'A collection of C++ data-structure coursework. Previously inspected examples include a phonebook with name-based lookup and a circular queue for processing customer requests. These small console programs connect record storage, search operations, and queue behavior to understandable everyday tasks.\n\nThe repository has no root README, so this description follows the inspected source rather than assuming a larger application or undocumented features.',
    highlights: ['Phonebook records and name lookup', 'Circular request queue', 'Console-based C++ data-structure practice'],
    progressBrief: 'Source-based coursework collection covering phonebook lookup and circular queues.',
  },
  'DAA-Assignments': {
    description: 'A C++ algorithm coursework collection with previously inspected examples of merge sorting CSV order records and solving a constrained item-selection problem using dynamic-programming knapsack. The exercises apply familiar algorithm techniques to structured inputs and explicit optimization choices.\n\nThe repository has no root README. This entry describes the inspected examples and does not infer a completed product, benchmark result, or broader algorithm library.',
    highlights: ['Merge sorting of CSV order records', 'Dynamic-programming knapsack exercise', 'Practical C++ algorithm coursework'],
    progressBrief: 'Source-based coursework includes CSV merge sort and dynamic-programming knapsack.',
  },
  EcoSip: {
    description: 'A responsive front-end concept for a sustainable water-bottle brand, implemented with HTML, CSS, and JavaScript. Product variations, a gallery, responsive navigation, and brand storytelling form a small product-presentation website.\n\nThe entry is based on previously inspected source because the repository has no root README. The sustainability and promotional copy belongs to the brand concept; it does not establish environmental certification, sales, or business results.',
    highlights: ['Product-variation presentation and gallery', 'Responsive site navigation', 'HTML, CSS, and JavaScript brand storytelling'],
    progressBrief: 'Front-end bottle-brand concept with product presentation and responsive navigation.',
  },
  'Bleach-portfolio': {
    description: 'An earlier React and TypeScript portfolio exploring a Bleach-inspired visual identity. The README describes an animated introduction, project showcases, technology highlights, biography, achievements, and contact links in a responsive site. Tailwind CSS and Framer Motion support the interface and animation work.\n\nIts cinematic loading sequence, diagonal reveal, and animated hero capture an earlier direction in personal web design. It remains in the archive as a separate visual experiment alongside the current Ink & Steel rebuild.',
    highlights: ['Anime-inspired responsive portfolio', 'Cinematic loading and diagonal reveal', 'Project showcases and contact sections', 'React, TypeScript, Tailwind, and Framer Motion'],
    progressBrief: 'Earlier anime-inspired portfolio experiment with cinematic transitions and project showcases.',
  },
  portfolio_website: {
    description: 'My current portfolio, rebuilt around Ink & Steel: paper-white and ink-black sections, condensed editorial typography, vermilion actions, and original blade-inspired artwork. React, TypeScript, and Vite provide the application foundation, with GSAP transitions and a separately loaded Three.js katana.\n\nSelected work uses a six-project cinematic presentation, while the archive supports combined search and filters. Public projects open keyboard-accessible detail dialogs. Authorized private work remains limited to brief summaries and clearly visible private labels.\n\nThe katana renders on demand and falls back to a matching static illustration for reduced motion or unavailable WebGL. Public repository metadata has a saved fallback catalog so the content remains usable when GitHub cannot be reached.',
    highlights: ['Original interactive katana with on-demand rendering', 'Cinematic selected work and searchable project archive', 'Accessible public-project dialogs and reduced motion', 'Brief authorized private summaries with saved catalog fallback'],
    progressBrief: 'Ink & Steel rebuild adds cinematic work, interactive 3D, and a complete public/private archive.',
  },
};
