import type { ProjectVisual } from '../types';

const PAPER = '#F5F4F0';
const INK = '#151515';
const STEEL = '#b7b7b7';
const RED = '#BE332B';
const FONT = "'Instrument Sans', Arial, sans-serif";

type SceneKind = Extract<ProjectVisual, 'commerce' | 'partnerships' | 'laboratory' | 'training' | 'forecast'>;

function Commerce() {
  return <>
    <path d="M0 458 790 0h210v620H0Z" fill="#dbdbdb" />
    <path d="m81 381 276-159 220 107-276 160Z" fill="#bcbcbc" />
    <g className="scene-node" style={{ transformOrigin: '300px 310px' }}>
      <path d="m127 188 200-116 200 99-200 116Z" fill={PAPER} />
      <path d="M127 188v182l200 99V287Z" fill={INK} />
      <path d="M327 287v182l200-116V171Z" fill="#8b8b8b" />
      <path d="m171 187 156-90 154 76-155 90Z" fill="#c8c8c8" />
      <path d="M229 129v30l200 99v-30Z" fill={RED} />
      <path d="m162 265 125 61v33l-125-61Z" fill={PAPER} />
      <path d="m162 319 73 36v13l-73-36Z" fill="#8e8e8e" />
    </g>
    <g className="scene-animate" style={{ transformOrigin: '731px 319px' }}>
      <path d="m562 325 174-100 174 85-174 101Z" fill={PAPER} />
      <path d="M562 325v126l174 85V411Z" fill="#9b9b9b" />
      <path d="M736 411v125l174-100V310Z" fill={INK} />
      <path d="m628 287 173 84v63l-49 28v-63l-174-85Z" fill={RED} />
      <path d="m773 442 97-56v18l-97 56Z" fill={PAPER} />
    </g>
    <path className="scene-path" d="m371 495 70 34 111-64 41 21" fill="none" stroke={RED} strokeWidth="13" strokeLinejoin="miter" />
    <path d="m581 469 17 18-25 3" fill="none" stroke={RED} strokeWidth="9" />
    <text x="78" y="568" fontFamily={FONT} fontSize="25" fill={INK}>Discover. Choose. Deliver.</text>
    <path d="M673 96h214v69H673Z" fill={INK} />
    <text x="699" y="140" fontFamily={FONT} fontSize="25" fill={PAPER}>Catalog → order</text>
  </>;
}

function Partnerships() {
  return <>
    <path d="M0 0h1000v620H0Z" fill="#dfdfdf" />
    <path d="M499 0h501v620H499Z" fill="#cacaca" />
    <g className="scene-node" transform="rotate(-9 258 286)">
      <path d="M109 93h223v297H109Z" fill={PAPER} />
      <path d="M131 116h179v210H131Z" fill={INK} />
      <circle cx="220" cy="190" r="42" fill="#cacaca" />
      <path d="M147 326v-32c0-39 32-71 73-71s73 32 73 71v32Z" fill="#cacaca" />
      <text x="131" y="366" fontFamily={FONT} fontSize="24" fill={INK}>Discover</text>
    </g>
    <g className="scene-node" transform="rotate(8 439 339)">
      <path d="M336 204h222v296H336Z" fill={PAPER} />
      <path d="M357 225h179v210H357Z" fill="#acacac" />
      <circle cx="447" cy="296" r="42" fill={INK} />
      <path d="M373 435v-32c0-39 33-71 74-71s73 32 73 71v32Z" fill={INK} />
      <text x="359" y="475" fontFamily={FONT} fontSize="24" fill={INK}>Review</text>
    </g>
    <path className="scene-path" d="M278 433v97h365V181h121" fill="none" stroke={RED} strokeWidth="15" strokeLinejoin="round" />
    <g className="scene-animate" style={{ transformOrigin: '787px 299px' }}>
      <path d="M699 120h226v354H699Z" fill={INK} />
      <circle cx="812" cy="260" r="68" fill={PAPER} />
      <path d="m778 258 25 25 47-51" fill="none" stroke={RED} strokeWidth="12" />
      <text x="726" y="408" fontFamily={FONT} fontSize="25" fill={PAPER}>Collaborate</text>
    </g>
    <circle className="scene-event" cx="643" cy="360" r="18" fill={RED} stroke={PAPER} strokeWidth="8" />
  </>;
}

function Laboratory() {
  return <>
    <path d="M0 474 575 142 1000 350v270H0Z" fill="#d1d1d1" />
    <path d="m210 388 358-205 339 166-358 206Z" fill="#aeaeae" />
    <path d="m244 363 320-183 310 151-321 184Z" fill={PAPER} />
    <path d="M244 363v36l309 153v-37ZM553 515v37l321-184v-37Z" fill="#969696" />
    <g className="scene-node">
      <path d="m419 293 60-34 107 53-60 34Z" fill="#b2b2b2" />
      <path d="M419 293v55l107 52v-54ZM526 346v54l60-35v-53Z" fill={INK} />
      <path d="M451 157h18v129l-18 10Z" fill={INK} />
      <path d="m389 105 72-41 113 55-72 41Z" fill={PAPER} />
      <path d="M389 105v71l113 55v-71Z" fill={INK} />
      <path d="M502 160v71l72-41v-71Z" fill="#969696" />
      <ellipse cx="443" cy="164" rx="25" ry="32" transform="rotate(-27 443 164)" fill={RED} />
      <ellipse cx="443" cy="164" rx="12" ry="16" transform="rotate(-27 443 164)" fill={INK} />
    </g>
    <g className="scene-node">
      <path d="M666 214v81l-54 85c-13 24 14 49 54 49h58c39 0 65-25 52-49l-54-85v-81" fill={PAPER} stroke={INK} strokeWidth="7" />
      <path d="m645 348-19 35c-7 13 10 26 40 26h58c29 0 46-13 39-26l-19-35Z" fill={RED} />
      <path d="M658 214h72" stroke={INK} strokeWidth="13" />
    </g>
    <path className="scene-path" d="M481 245 590 299 686 246" fill="none" stroke={RED} strokeWidth="5" strokeDasharray="12 10" />
    <path d="M89 141v-41h76M835 100h76v41M89 417v41h76M835 458h76v-41" fill="none" stroke={INK} strokeWidth="9" />
    <g className="scene-animate" transform="translate(107 505)">
      {[16, 32, 52, 72, 43, 25, 55, 80, 48, 31, 17].map((height, index) => <path key={index} d={`M${index * 14} ${38 - height / 2}v${height}`} stroke={RED} strokeWidth="7" strokeLinecap="round" />)}
      <text x="194" y="47" fontFamily={FONT} fontSize="24" fill={INK}>Observe → guide → review</text>
    </g>
  </>;
}

function Training() {
  return <>
    <path d="M0 394 683 0h317v620H0Z" fill="#d8d8d8" />
    <g className="scene-node">
      <path d="m111 281 216-124 223 108-216 126Z" fill={PAPER} />
      <path d="M111 281v129l223 109V391Z" fill={INK} />
      <path d="M334 391v128l216-126V265Z" fill="#939393" />
      <path d="m152 281 174-100 182 88-174 102Z" fill="#bdbdbd" />
      <path d="m235 281 90-52 94 45-91 53Z" fill={RED} />
      <path d="m151 349 135 66v20l-135-66Z" fill={PAPER} />
      <path d="m151 386 79 39v11l-79-39Z" fill="#919191" />
    </g>
    <path className="scene-path" d="m414 469 160 77 228-132" fill="none" stroke={RED} strokeWidth="13" />
    <g className="scene-animate" style={{ transformOrigin: '749px 252px' }}>
      <path d="m596 172 184-106 135 66-185 107Z" fill={PAPER} />
      <path d="M596 172v186l134 66V239Z" fill={INK} />
      <path d="M730 239v185l185-107V132Z" fill="#979797" />
      <path d="m767 258 112-65v35l-112 65Z" fill={PAPER} />
      <path d="m767 310 112-65v12l-112 65Z" fill="#5e5e5e" />
      <path d="m767 347 65-38v12l-65 38Z" fill="#5e5e5e" />
      <path d="m611 181 23 11v47l-23-11Z" fill={RED} />
    </g>
    <path className="scene-path" d="M736 88V35H335v94" fill="none" stroke={INK} strokeWidth="8" />
    <path d="m320 113 15 23 15-23" fill="none" stroke={INK} strokeWidth="8" />
    <text x="82" y="582" fontFamily={FONT} fontSize="25" fill={INK}>Train. Save. Recover.</text>
  </>;
}

function Forecast() {
  return <>
    <path d="M0 0h1000v620H0Z" fill="#d9d9d9" />
    <path d="m-125 408 178 217L1125 207 947-10Z" fill={INK} />
    <path d="M-45 334 61 463 1041 80 935-49Z" fill="#aaaaaa" />
    <path d="m-10 550 108-42m56-22 109-42m57-22 108-42m57-22 108-42m57-22 108-42m57-22 108-42" fill="none" stroke={PAPER} strokeWidth="5" />
    <path d="M153 0 657 620h176L329 0Z" fill={PAPER} />
    <path d="M180 0 684 620" stroke="#c2c2c2" strokeWidth="8" />
    <path className="scene-path" d="M361 429C451 391 568 338 727 294S905 224 962 146" fill="none" stroke={RED} strokeWidth="13" />
    <path className="scene-path" d="M361 429C460 391 568 338 719 365S846 443 916 522" fill="none" stroke="#919191" strokeWidth="9" strokeDasharray="18 12" />
    <path className="scene-path" d="M361 429C428 384 452 329 426 240S350 105 298 53" fill="none" stroke="#919191" strokeWidth="9" strokeDasharray="18 12" />
    <g className="scene-node" transform="translate(344 406) rotate(-22)">
      <rect x="-56" y="-29" width="112" height="58" rx="17" fill={RED} />
      <path d="M-26-22h49l9 13v18l-9 13h-49l-8-13V-9Z" fill={INK} />
      <path d="M-56-18h11m90 0h11M-56 18h11m90 0h11" stroke={PAPER} strokeWidth="5" />
    </g>
    <g transform="translate(736 203) rotate(-22)">
      <rect x="-54" y="-28" width="108" height="56" rx="16" fill="#8a8a8a" />
      <path d="M-27-21h49l9 12V9l-9 12h-49l-7-12V-9Z" fill={INK} />
    </g>
    <text x="71" y="100" fontFamily={FONT} fontSize="25" fill={INK}>One observation. Possible futures.</text>
  </>;
}

export default function ProjectSceneArt({ kind }: { kind: SceneKind }) {
  switch (kind) {
    case 'commerce': return <Commerce />;
    case 'partnerships': return <Partnerships />;
    case 'laboratory': return <Laboratory />;
    case 'training': return <Training />;
    case 'forecast': return <Forecast />;
  }
}
