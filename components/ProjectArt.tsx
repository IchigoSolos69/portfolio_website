import { useId } from 'react';
import type { ProjectVisual } from '../types';
import ProjectSceneArt from './ProjectSceneArt';

const PAPER = '#E4E3DF';
const INK = '#1B1C1B';
const STEEL = '#B5B7B4';
const RED = '#BE332B';

const descriptions: Record<ProjectVisual, string> = {
  commerce: 'An original illustration of commerce moving from product discovery to an order.',
  partnerships: 'An original illustration of discovering creators, reviewing prospects, and starting collaborations.',
  laboratory: 'An original illustration of computer-vision observation and spoken experiment guidance.',
  trajectory: 'An illustrative table-plane trajectory, traced across a table-tennis table.',
  training: 'An illustrative single-resource training workflow, from input data to a saved model.',
  campus: 'An illustrative campus building and the route a service request takes to its destination.',
  location: 'An illustrative neighborhood map with a location-sharing route.',
  world: 'An illustrative comparison of ball dynamics and predicted trajectories.',
  forecast: 'An illustrative set of possible vehicle-motion forecasts.',
  browser: 'An abstract illustration of browser tabs and a protected browsing window.',
  weather: 'An illustrative weather instrument and forecast curve.',
  inventory: 'An illustrative collection of inventory items organized into a system.',
  chemistry: 'An illustrative molecular structure and experiment notebook.',
  data: 'An illustrative transformation of source data into an analysis.',
  code: 'An abstract illustration of structured code and connected logic.',
  ecology: 'An abstract botanical illustration for an environmental project.',
  portfolio: 'An original typographic study of the letters A and M.',
};

function Trajectory() {
  return <>
    <path d="M118 419 507 184 893 362 501 599Z" fill="#CFD0CB" />
    <path d="M192 337 546 131 870 281 514 491Z" fill={INK} />
    <path d="M192 337 514 491 514 518 192 365Z" fill="#777C76" />
    <path d="M514 491 870 281 870 309 514 518Z" fill="#A9ADA5" />
    <path d="M211 338 546 143 849 283 513 479Z" fill="#545E55" />
    <path d="M211 338 546 143 849 283 513 479Z M379 240 682 381 M363 411 697 213" fill="none" stroke="#EFEFE8" strokeWidth="4" />
    <path d="M381 237 381 178 686 320 686 384Z" fill="#E4E3DF" fillOpacity=".84" stroke={INK} strokeWidth="3" />
    <path d="M381 178 686 320" stroke={INK} strokeWidth="7" />
    <path d="M252 392 252 486 278 499 278 405 M737 387 737 478 763 463 763 371" fill={INK} />
    <path className="art-trace" d="M230 301C288 80 388 52 483 230S646 437 761 243" fill="none" stroke={RED} strokeWidth="8" strokeLinecap="round" />
    <circle cx="230" cy="301" r="11" fill={RED} />
    <circle cx="483" cy="230" r="21" fill={RED} />
    <circle cx="761" cy="243" r="10" fill={RED} />
    <path d="m742 244 21-10-3 24" fill="none" stroke={RED} strokeWidth="7" />
    <path d="M108 123h142v17H108z" fill={INK} />
    <path d="M108 157h80v7h-80z" fill="#888B85" />
  </>;
}

function Campus() {
  return <>
    <path d="M71 444 526 184 944 389 489 649Z" fill="#CDD0C9" />
    <path d="m138 426 353-202 345 169-353 204Z" fill="#D9DCD5" />
    <path d="m312 209 213-121 274 132-213 123Z" fill="#F5F4F0" />
    <path d="M312 209v197l274 134V343Z" fill={INK} />
    <path d="M586 343v197l213-123V220Z" fill="#A6ACA2" />
    <path d="m309 200 215-122 283 137-216 124Z" fill={INK} />
    <path d="m355 201 170-97 235 113-171 98Z" fill="#EEEFE8" />
    {[0, 1, 2, 3, 4].map(i => <g key={i}>
      <path d={`m${342 + i * 45} ${259 + i * 22}v43l22 11v-43Z`} fill="#D2D6CA" />
      <path d={`m${342 + i * 45} ${331 + i * 22}v43l22 11v-43Z`} fill="#D2D6CA" />
    </g>)}
    {[0, 1, 2].map(i => <path key={i} d={`m${619 + i * 53} ${355 - i * 30}v106l28-16V${339 - i * 30}Z`} fill="#586252" />)}
    <path d="m439 405 49 24v63l-49-24Z" fill={PAPER} />
    <path className="art-trace" d="m142 486 101 49 83-48 55 27 83-47" fill="none" stroke={RED} strokeWidth="13" strokeLinejoin="miter" />
    <circle cx="142" cy="486" r="17" fill={RED} />
    <path d="M837 121v82" stroke={RED} strokeWidth="9" />
    <path d="m806 151 31-31 31 31" fill="none" stroke={RED} strokeWidth="9" />
    <path d="M114 126h126v16H114z" fill={INK} />
  </>;
}

function Location() {
  return <>
    <path d="M0 82h1000v168H0zM0 355h1000v183H0z" fill="#D2D5CD" />
    <path d="m192-60 156 0 373 740H565Z" fill="#C7CBC1" />
    <path d="m629-20 144 0-396 694H231Z" fill="#F5F4F0" />
    <path d="m40 128 143-1 36 75H40ZM368 128h164l-39 74h-87ZM777 128h183v74H736ZM39 404h136l-42 82H39ZM448 405h129l41 81H407ZM761 405h199v81H803Z" fill={INK} />
    <path d="m388 0 93 0 33 67h-92ZM811 0h149v65H775ZM40 570h48l-27 50H40ZM666 570h294v50H692Z" fill="#848D7F" />
    <path className="art-trace" d="M191 311h224l73 145h224" fill="none" stroke={RED} strokeWidth="14" strokeLinejoin="round" />
    <circle cx="191" cy="311" r="31" fill={PAPER} />
    <circle cx="191" cy="311" r="15" fill={RED} />
    <path d="M714 238c-53 0-94 40-94 91 0 68 94 151 94 151s94-83 94-151c0-51-41-91-94-91Z" fill={RED} />
    <circle cx="714" cy="328" r="31" fill={PAPER} />
    <path d="m533 239 34 67-28 50-34-67Z" fill="#848D7F" />
  </>;
}

function Dynamics() {
  return <>
    <path d="M112 515 457 110 923 359 578 629Z" fill="#CED1C8" />
    <path d="m205 440 270-288 347 201-270 215Z" fill="#F5F4F0" />
    <path d="m257 410 250-205M352 468l249-211M448 521l249-211" stroke="#BBC1B4" strokeWidth="4" />
    <path d="M262 440C442 394 423 219 663 223" stroke={INK} strokeWidth="12" fill="none" />
    <path className="art-trace" d="M262 440C397 406 467 421 732 325" stroke={RED} strokeWidth="10" fill="none" />
    <path d="M262 440C438 394 538 402 738 431" stroke="#7B8574" strokeWidth="8" strokeDasharray="16 14" fill="none" />
    <circle cx="262" cy="440" r="28" fill={RED} /><circle cx="663" cy="223" r="16" fill={INK} /><circle cx="732" cy="325" r="16" fill={RED} />
    <text x="112" y="107" fill={INK} fontFamily="'Instrument Sans', Arial, sans-serif" fontSize="25" fontWeight="600">Physics / learned dynamics</text>
  </>;
}

function Inventory() {
  return <>
    <path d="m183 402 316-182 323 158-315 183Z" fill="#CCD0C7" />
    {[{x:196,y:278,w:135,h:122}, {x:353,y:187,w:135,h:122}, {x:514,y:270,w:135,h:122}, {x:673,y:179,w:135,h:122}].map(({x,y,w,h}, i) => <g key={i}>
      <path d={`m${x} ${y} 67-38 ${w} 65-67 39Z`} fill={i === 2 ? RED : '#F5F4F0'} />
      <path d={`m${x} ${y}v${h}l${w} 65V${y+65}Z`} fill={i === 2 ? '#8D2722' : INK} />
      <path d={`m${x+w} ${y+65} 67-39v${h}l-67 39Z`} fill={i === 2 ? '#D96A5C' : '#A3AA9B'} />
      <path d={`m${x+25} ${y+44} 69 33v14l-69-33Z`} fill={PAPER} />
    </g>)}
  </>;
}

function Weather() {
  return <>
    <circle cx="600" cy="234" r="130" fill={RED} />
    <path d="M172 390c0-58 47-106 106-106 25-88 158-113 216-33 68-27 146 25 146 98 75 0 131 61 131 122H172Z" fill={INK} />
    <path className="art-trace" d="M181 532c91 0 111-135 202-135s127 134 220 134 122-74 217-74" stroke={PAPER} strokeWidth="9" fill="none" />
    <path d="M276 170v-50M155 231l-40-28M450 131l29-41M793 247h53" stroke={INK} strokeWidth="9" />
  </>;
}

function Chemistry() {
  return <>
    <path d="m541 178 238-49 70 339-239 49Z" fill="#B9BFB2" />
    <path d="m510 153 238-49 70 339-239 49Z" fill="#F5F4F0" />
    <path d="m563 229 150-31M576 291l150-31M589 353l92-19" stroke="#B7BEB0" strokeWidth="8" />
    <path className="art-trace" d="m207 308 129-75 130 75v151l-130 75-129-75Zm0 0-79-45m208-30V143m130 165 83-48" stroke={INK} strokeWidth="11" fill="none" />
    {[{x:207,y:308}, {x:466,y:308}, {x:336,y:534}, {x:207,y:459}, {x:466,y:459}].map(({x,y})=><circle key={`${x}${y}`} cx={x} cy={y} r="19" fill={INK} />)}
    <circle cx="336" cy="233" r="34" fill={RED} />
  </>;
}

function Browser() {
  return <>
    <path d="m196 184 538-63 64 379-538 63Z" fill="#BBC1B2" />
    <path d="m165 151 538-63 64 379-538 63Z" fill={INK} />
    <path d="m197 208 483-57 47 282-483 57Z" fill="#F5F4F0" />
    <path d="m208 262 220-26 22 132-220 26Z" fill="#CDD2C6" />
    <path d="m462 233 182-21M472 292l144-17M482 351l181-21" stroke="#8C9680" strokeWidth="13" />
    <path d="M710 296 816 331v100c0 84-106 135-106 135s-106-51-106-135V331Z" fill={RED} />
    <path className="art-trace" d="m660 423 35 34 68-83" stroke={PAPER} strokeWidth="12" fill="none" />
  </>;
}

function Data() {
  return <>
    <path d="m123 228 242-52 59 286-242 52Z" fill={INK} />
    {[0, 1, 2, 3].map(i => <path key={i} d={`m172 ${270+i*45} 151-32`} stroke={i===1 ? RED : '#BBC3B1'} strokeWidth="12" />)}
    <path d="m535 414 334-72v41l-334 72Z" fill="#B6BEB0" />
    <path d="m552 395 64-14V237l-64 14ZM649 374l64-14V157l-64 14Z" fill={INK} />
    <path d="m746 353 64-14V267l-64 14Z" fill={RED} />
    <path className="art-trace" d="m393 299 50-11 25 25 39-8" fill="none" stroke={RED} strokeWidth="10" />
  </>;
}

function Ecology() {
  return <>
    <path d="M497 549V257" stroke={INK} strokeWidth="16" />
    <path d="M493 407C274 409 210 303 207 142c204 2 310 74 286 265Z" fill={INK} />
    <path d="M506 328C516 139 631 91 801 107c-16 181-107 269-295 221Z" fill="#7D8A70" />
    <path className="art-trace" d="m497 475-197-224m201 82 199-151" stroke={PAPER} strokeWidth="8" fill="none" />
    <circle cx="784" cy="457" r="58" fill={RED} />
  </>;
}

function Code({ portfolio = false }: { portfolio?: boolean }) {
  return portfolio ? <>
    <path d="M133 516 321 103h95l110 413H414l-18-83H284l-35 83Zm190-174h54l-19-100Z" fill={INK} fillRule="evenodd" />
    <path d="m499 516 66-413h104l27 214 100-214h104l-66 413H736l34-200-91 200h-69l-22-200-31 200Z" fill={INK} />
    <path d="M790 65 404 567h59L854 65Z" fill={RED} />
  </> : <>
    <path d="m292 172-164 138 164 138 52-62-92-76 92-76ZM708 172l164 138-164 138-52-62 92-76-92-76Z" fill={INK} />
    <path className="art-trace" d="M558 111 388 509h86l170-398Z" fill={RED} />
  </>;
}

export default function ProjectArt({ kind, className = '', fit = 'slice' }: { kind: ProjectVisual; className?: string; fit?: 'slice' | 'meet' }) {
  const id = useId();
  let drawing;
  switch (kind) {
    case 'trajectory': drawing = <Trajectory />; break;
    case 'commerce':
    case 'partnerships':
    case 'laboratory':
    case 'training':
    case 'forecast': drawing = <ProjectSceneArt kind={kind} />; break;
    case 'campus': drawing = <Campus />; break;
    case 'location': drawing = <Location />; break;
    case 'world': drawing = <Dynamics />; break;
    case 'inventory': drawing = <Inventory />; break;
    case 'weather': drawing = <Weather />; break;
    case 'chemistry': drawing = <Chemistry />; break;
    case 'browser': drawing = <Browser />; break;
    case 'data': drawing = <Data />; break;
    case 'ecology': drawing = <Ecology />; break;
    case 'portfolio': drawing = <Code portfolio />; break;
    default: drawing = <Code />;
  }
  return <svg className={`project-art ${className}`.trim()} viewBox="0 0 1000 620" preserveAspectRatio={`xMidYMid ${fit}`} role="img" aria-labelledby={`${id}-title ${id}-description`}>
    <title id={`${id}-title`}>Project illustration</title>
    <desc id={`${id}-description`}>{descriptions[kind]}</desc>
    <path fill={PAPER} d="M0 0h1000v620H0z" />
    {drawing}
  </svg>;
}
