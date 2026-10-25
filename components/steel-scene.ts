import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

function bladeSurface(lower: (x: number) => THREE.Vector3, upper: (x: number) => THREE.Vector3, material: THREE.Material) {
  const vertices: number[] = [];
  const indices: number[] = [];
  const segments = 100;
  for (let i = 0; i <= segments; i += 1) {
    const x = 9.1 * i / segments;
    vertices.push(...lower(x).toArray(), ...upper(x).toArray());
    if (i < segments) { const n = i * 2; indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2); }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function grainTexture(cloth = false) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = cloth ? '#777777' : '#bcbcbc';
  ctx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += cloth ? 3 : 6) {
    for (let x = 0; x < 128; x += cloth ? 3 : 6) {
      const shade = 100 + ((x * 73 + y * 31) % 100);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      if (cloth) ctx.fillRect(x, y, 1, 2);
      else { ctx.beginPath(); ctx.ellipse(x + (y % 12 ? 3 : 0), y, 1.8, 1.2, 0, 0, Math.PI * 2); ctx.fill(); }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(cloth ? 6 : 10, 2);
  return texture;
}

function wrapRibbon(direction: number, material: THREE.Material) {
  const vertices: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];
  const segments = 440;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const theta = direction * t * Math.PI * 2 * 5.3 + (direction < 0 ? Math.PI : 0);
    const radius = direction > 0 ? 1.02 : 1.055;
    const y = Math.cos(theta) * .288 * radius;
    const z = Math.sin(theta) * .226 * radius;
    const x = -3.39 + t * 2.91;
    vertices.push(x - .079, y, z, x + .079, y, z);
    uvs.push(t, 0, t, 1);
    if (i < segments) { const n = i * 2; indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2); }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function makeKatana() {
  const steel = new THREE.MeshStandardMaterial({ color: 0xabb3b7, roughness: .22, metalness: 1, side: THREE.DoubleSide });
  const polished = new THREE.MeshStandardMaterial({ color: 0xe4e7e8, roughness: .11, metalness: 1, side: THREE.DoubleSide });
  const spine = new THREE.MeshStandardMaterial({ color: 0x626c73, roughness: .28, metalness: .95, side: THREE.DoubleSide });
  const iron = new THREE.MeshStandardMaterial({ color: 0x202423, roughness: .35, metalness: .8 });
  const brass = new THREE.MeshStandardMaterial({ color: 0x9e8660, roughness: .29, metalness: .92 });
  const copper = new THREE.MeshStandardMaterial({ color: 0xb19467, roughness: .34, metalness: .92 });
  const wrapGrain = grainTexture(true);
  const skinGrain = grainTexture();
  const cord = new THREE.MeshStandardMaterial({ color: 0x151818, roughness: .85, metalness: .05, side: THREE.DoubleSide, bumpMap: wrapGrain, bumpScale: .018 });
  const skin = new THREE.MeshStandardMaterial({ color: 0x1d2220, roughness: .93, bumpMap: skinGrain, bumpScale: .016 });
  const raySkin = new THREE.MeshStandardMaterial({ color: 0xc7c3b6, roughness: .91, bumpMap: skinGrain, bumpScale: .012, side: THREE.DoubleSide });
  const red = new THREE.MeshStandardMaterial({ color: 0x9e2926, roughness: .72 });
  const materials = [steel, polished, spine, iron, brass, copper, cord, skin, raySkin, red];
  const model = new THREE.Group();
  const curve = (x: number) => .0094 * x * x;
  const taper = (x: number) => x < 8.18 ? 1 - x * .018 : Math.max(0, (9.1 - x) / .92) * .853;
  const p = (x: number, y: number, z: number) => new THREE.Vector3(x, curve(x) + y * taper(x), z * taper(x));
  for (const side of [1, -1]) {
    model.add(bladeSurface(x => p(x, .045, .12 * side), x => p(x, .26, .063 * side), steel));
    model.add(bladeSurface(x => p(x, -.30, .005 * side), x => p(x, .045, .12 * side), polished));
    model.add(bladeSurface(x => p(x, .175, .089 * side), x => p(x, .195, .083 * side), spine));
    // A narrow irregular temper line follows the cutting face without glowing.
    model.add(bladeSurface(
      x => { const y = -.195 + .009 * Math.sin(x * 12); return p(x, y, (.007 + (y + .30) / .345 * .115) * side); },
      x => { const y = -.18 + .009 * Math.sin(x * 12); return p(x, y, (.007 + (y + .30) / .345 * .115) * side); },
      steel,
    ));
  }
  model.add(bladeSurface(x => p(x, .26, -.063), x => p(x, .26, .063), spine));
  model.add(bladeSurface(x => p(x, -.30, -.005), x => p(x, -.30, .005), polished));

  const guardShape = new THREE.Shape();
  guardShape.absellipse(0, 0, .53, .67, 0, Math.PI * 2, false, 0);
  const center = new THREE.Path();
  center.moveTo(-.13, -.28); center.lineTo(-.13, .28); center.lineTo(.13, .28); center.lineTo(.13, -.28); center.closePath();
  guardShape.holes.push(center);
  for (const side of [-1, 1]) {
    const hole = new THREE.Path();
    hole.absellipse(side * .337, 0, .105, .31, 0, Math.PI * 2, true, side * .16);
    guardShape.holes.push(hole);
  }
  const guardGeometry = new THREE.ExtrudeGeometry(guardShape, { depth: .12, bevelEnabled: true, bevelSegments: 3, bevelSize: .033, bevelThickness: .028, steps: 1, curveSegments: 48 });
  const guard = new THREE.Mesh(guardGeometry, [iron, brass]);
  guard.rotation.y = Math.PI / 2;
  guard.position.x = -.26;
  model.add(guard);

  const box = (width: number, height: number, depth: number, radius: number, material: THREE.Material, x: number) => {
    const object = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 3, radius), material);
    object.position.x = x;
    model.add(object);
    return object;
  };
  box(.49, .59, .29, .035, copper, .03);
  box(.075, .625, .32, .018, brass, -.18);
  box(.12, .61, .46, .025, brass, -.40);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 2.97, 40, 1), skin);
  handle.rotation.z = Math.PI / 2;
  handle.scale.set(.2675, 1, .2075);
  handle.position.x = -1.96;
  model.add(handle);
  for (const side of [1, -1]) {
    for (let i = 0; i < 5; i += 1) {
      const x = -3.04 + i * .549;
      const panel = new THREE.BufferGeometry();
      panel.setAttribute('position', new THREE.Float32BufferAttribute([
        x, 0, .218 * side,
        x - .145, 0, .215 * side,
        x, .125, .191 * side,
        x + .145, 0, .215 * side,
        x, -.125, .191 * side,
      ], 3));
      panel.setIndex([0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1]);
      panel.computeVertexNormals();
      model.add(new THREE.Mesh(panel, raySkin));
    }
  }
  model.add(wrapRibbon(1, cord), wrapRibbon(-1, cord));
  box(.25, .59, .46, .085, iron, -3.47);
  box(.055, .595, .47, .018, brass, -3.34);
  box(.16, .59, .46, .05, iron, -.49);
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i += 1) {
      const stud = new THREE.Mesh(new THREE.SphereGeometry(.047, 12, 8), brass);
      stud.scale.set(1.8, .65, .4);
      stud.position.set(-1.95 + i * .105, -.025, side * .247);
      model.add(stud);
    }
  }
  // Restrained red silk at the pommel is the only saturated material.
  const redBand = new THREE.Mesh(new THREE.TorusGeometry(.273, .028, 8, 64), red);
  redBand.rotation.y = Math.PI / 2;
  redBand.scale.set(.83, 1, 1);
  redBand.position.x = -3.13;
  model.add(redBand);
  const silkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.18, -.23, .08), new THREE.Vector3(-3.65, -.49, .15),
    new THREE.Vector3(-3.90, -.28, .16), new THREE.Vector3(-3.65, -.10, .14),
    new THREE.Vector3(-3.24, -.25, .08),
  ]);
  model.add(new THREE.Mesh(new THREE.TubeGeometry(silkCurve, 40, .026, 6, false), red));
  model.position.x = -2.61;
  return { model, materials, textures: [wrapGrain, skinGrain] };
}

export function createSteelScene(container: HTMLElement, onReady: () => void, onFailure: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.16;
  const canvas = renderer.domElement;
  canvas.className = 'steel-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' });
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environmentTarget = pmrem.fromScene(environment, .03);
  scene.environment = environmentTarget.texture;
  environment.dispose();
  pmrem.dispose();
  const camera = new THREE.OrthographicCamera(-7.2, 7.2, 4, -4, .1, 60);
  camera.position.set(0, 0, 18);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x777b79, 1.2));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 7, 10);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe8ecec, 1.6);
  fill.position.set(4, -5, 6);
  scene.add(fill);
  const { model, materials, textures } = makeKatana();
  const sculpture = new THREE.Group();
  sculpture.add(model);
  sculpture.rotation.set(.24, -.24, .34);
  scene.add(sculpture);

  let disposed = false;
  let failed = false;
  let visible = true;
  let frame: number | undefined;
  let initialized = false;
  let targetX = .24;
  let targetY = -.24;
  let dragX = 0;
  let dragY = 0;
  let pointer: { id: number; x: number; y: number; dragX: number; dragY: number; horizontal: boolean } | null = null;
  let width = 0;
  let height = 0;

  function render() {
    frame = undefined;
    if (disposed || failed || !visible || document.hidden || width === 0 || height === 0) return;
    sculpture.rotation.x = THREE.MathUtils.lerp(sculpture.rotation.x, targetX, .16);
    sculpture.rotation.y = THREE.MathUtils.lerp(sculpture.rotation.y, targetY, .16);
    try {
      renderer.render(scene, camera);
      if (!initialized) { initialized = true; onReady(); }
    } catch { fail(); return; }
    if (Math.abs(targetX - sculpture.rotation.x) + Math.abs(targetY - sculpture.rotation.y) > .001) requestRender();
  }
  function requestRender() {
    if (frame === undefined && !disposed && !failed && visible && !document.hidden) frame = requestAnimationFrame(render);
  }
  function fail() {
    failed = true;
    canvas.style.visibility = 'hidden';
    if (frame !== undefined) cancelAnimationFrame(frame);
    frame = undefined;
    onFailure();
  }
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    const aspect = width / height;
    const halfHeight = Math.max(2.9, 7.0 / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    sculpture.rotation.z = aspect < 1.65 ? .47 : .34;
    requestRender();
  }
  function rotate(x: number, y: number) {
    dragX = THREE.MathUtils.clamp(x, -.2, .2);
    dragY = THREE.MathUtils.clamp(y, -.4, .4);
    targetX = .24 + dragX;
    targetY = -.24 + dragY;
    requestRender();
  }
  function reset() { rotate(0, 0); }
  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, dragX, dragY, horizontal: false };
    if (event.pointerType !== 'touch') { pointer.horizontal = true; container.setPointerCapture(event.pointerId); }
    container.classList.add('is-dragging');
  }
  function onPointerMove(event: PointerEvent) {
    if (pointer && pointer.id === event.pointerId) {
      const deltaX = event.clientX - pointer.x;
      const deltaY = event.clientY - pointer.y;
      if (event.pointerType === 'touch' && !pointer.horizontal) {
        if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) { onPointerUp(); return; }
        if (Math.abs(deltaX) < 8) return;
        pointer.horizontal = true;
        container.setPointerCapture(event.pointerId);
      }
      rotate(pointer.dragX + (event.pointerType === 'touch' ? 0 : deltaY * .002), pointer.dragY + deltaX * .0035);
    } else if (event.pointerType === 'mouse') {
      const bounds = container.getBoundingClientRect();
      targetX = .24 + dragX + ((event.clientY - bounds.top) / bounds.height - .5) * .06;
      targetY = -.24 + dragY + ((event.clientX - bounds.left) / bounds.width - .5) * .08;
      requestRender();
    }
  }
  function onPointerUp() {
    if (pointer && container.hasPointerCapture(pointer.id)) container.releasePointerCapture(pointer.id);
    pointer = null;
    container.classList.remove('is-dragging');
  }
  function onPointerLeave() {
    if (!pointer) { targetX = .24 + dragX; targetY = -.24 + dragY; requestRender(); }
  }
  function onKeyDown(event: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') reset();
    else rotate(dragX + (event.key === 'ArrowUp' ? -.06 : event.key === 'ArrowDown' ? .06 : 0), dragY + (event.key === 'ArrowLeft' ? -.1 : event.key === 'ArrowRight' ? .1 : 0));
  }
  function onVisibility() {
    if (document.hidden && frame !== undefined) { cancelAnimationFrame(frame); frame = undefined; }
    else requestRender();
  }
  function onContextLost(event: Event) { event.preventDefault(); fail(); }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible && frame !== undefined) { cancelAnimationFrame(frame); frame = undefined; }
    else requestRender();
  });
  const resizeObserver = new ResizeObserver(resize);
  observer.observe(container); resizeObserver.observe(container);
  container.addEventListener('pointerdown', onPointerDown);
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerup', onPointerUp);
  container.addEventListener('pointercancel', onPointerUp);
  container.addEventListener('lostpointercapture', onPointerUp);
  container.addEventListener('pointerleave', onPointerLeave);
  container.addEventListener('keydown', onKeyDown);
  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onContextLost);
  resize();
  return {
    reset,
    dispose() {
      if (disposed) return;
      disposed = true;
      if (frame !== undefined) cancelAnimationFrame(frame);
      onPointerUp(); observer.disconnect(); resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('lostpointercapture', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      sculpture.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
      materials.forEach(material => material.dispose());
      textures.forEach(texture => texture.dispose());
      environmentTarget.dispose();
      scene.environment = null;
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove();
    },
  };
}
