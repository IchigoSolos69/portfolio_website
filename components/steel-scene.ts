import * as THREE from 'three';

type Point = [number, number, number];

function face(points: Point[], material: THREE.Material) {
  const geometry = new THREE.BufferGeometry();
  const triangles: number[] = [];
  for (let index = 1; index < points.length - 1; index += 1) {
    triangles.push(...points[0], ...points[index], ...points[index + 1]);
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(triangles, 3));
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

export function createSteelScene(container: HTMLElement, onReady: () => void, onFailure: () => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const canvas = renderer.domElement;
  canvas.className = 'steel-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', pointerEvents: 'none' });
  container.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-3.8, 3.8, 3.8, -3.8, 0.1, 50);
  camera.position.set(0, 0.05, 12);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x757a79, 3));
  const key = new THREE.DirectionalLight(0xffffff, 5.2);
  key.position.set(-3, 5, 7);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe8ebe7, 2.3);
  fill.position.set(5, -3, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 3);
  rim.position.set(1, 3, -4);
  scene.add(rim);

  const steel = new THREE.MeshStandardMaterial({ color: 0xbfc4c2, roughness: 0.34, metalness: 0.68, side: THREE.DoubleSide });
  const bright = new THREE.MeshStandardMaterial({ color: 0xe7e9e4, roughness: 0.25, metalness: 0.52, side: THREE.DoubleSide });
  const dark = new THREE.MeshStandardMaterial({ color: 0x171a19, roughness: 0.48, metalness: 0.38, side: THREE.DoubleSide });
  const edge = new THREE.MeshStandardMaterial({ color: 0x616967, roughness: 0.3, metalness: 0.74, side: THREE.DoubleSide });
  const red = new THREE.MeshStandardMaterial({ color: 0xbe332b, roughness: 0.54, metalness: 0.18, side: THREE.DoubleSide });
  const materials = [steel, bright, dark, edge, red];
  const sculpture = new THREE.Group();
  const a: Point = [-0.71, -2.72, 0];
  const b: Point = [-0.65, 1.88, 0];
  const c: Point = [0.55, 3.03, -0.04];
  const d: Point = [0.65, -2.1, 0];
  const ridgeBottom: Point = [-0.1, -2.46, 0.34];
  const ridgeTop: Point = [-0.04, 1.0, 0.34];
  const e: Point = [0.73, 1.76, -0.24];
  const f: Point = [0.78, -2.68, -0.24];
  const backA: Point = [-0.71, -2.72, -0.24];
  const backB: Point = [-0.65, 1.88, -0.24];

  sculpture.add(
    face([a, b, ridgeTop, ridgeBottom], steel),
    face([b, c, ridgeTop], bright),
    face([ridgeBottom, ridgeTop, c, d], bright),
    face([a, ridgeBottom, d], edge),
    face([d, c, e, f], dark),
    face([a, d, f, backA], dark),
    face([a, backA, backB, b], dark),
    face([backA, f, e, c, backB], dark),
    face([[0.666, -1.88, -0.025], [0.579, 2.48, -0.085], [0.618, 2.22, -0.14], [0.712, -2.17, -0.14]], red),
  );

  // A second folded plane makes the profile read as a sculpture, not a flat icon.
  sculpture.add(face([[-0.69, -2.6, -0.25], [-0.69, 1.87, -0.25], [-1.03, 1.3, -0.65], [-1.05, -2.76, -0.65]], dark));
  sculpture.rotation.set(0.12, -0.46, -0.57);
  sculpture.position.set(0.18, -0.04, 0);
  scene.add(sculpture);

  let disposed = false;
  let failed = false;
  let visible = true;
  let frame: number | undefined;
  let initialized = false;
  let targetX = 0.12;
  let targetY = -0.46;
  let dragX = 0;
  let dragY = 0;
  let pointer: { id: number; x: number; y: number; dragX: number; dragY: number; horizontal: boolean } | null = null;
  let width = 0;
  let height = 0;

  function render() {
    frame = undefined;
    if (disposed || failed || !visible || document.hidden || width === 0 || height === 0) return;
    sculpture.rotation.x = THREE.MathUtils.lerp(sculpture.rotation.x, targetX, 0.16);
    sculpture.rotation.y = THREE.MathUtils.lerp(sculpture.rotation.y, targetY, 0.16);
    try {
      renderer.render(scene, camera);
      if (!initialized) { initialized = true; onReady(); }
    } catch {
      fail();
      return;
    }
    if (Math.abs(targetX - sculpture.rotation.x) + Math.abs(targetY - sculpture.rotation.y) > 0.001) requestRender();
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
    const halfHeight = 3.5;
    const halfWidth = halfHeight * (width / height);
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    requestRender();
  }

  function rotate(x: number, y: number) {
    dragX = THREE.MathUtils.clamp(x, -0.45, 0.45);
    dragY = THREE.MathUtils.clamp(y, -0.9, 0.9);
    targetX = 0.12 + dragX;
    targetY = -0.46 + dragY;
    requestRender();
  }

  function reset() { rotate(0, 0); }
  function onPointerDown(event: PointerEvent) {
    if (event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, dragX, dragY, horizontal: false };
    if (event.pointerType !== 'touch') {
      pointer.horizontal = true;
      container.setPointerCapture(event.pointerId);
    }
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
      } else if (event.pointerType !== 'touch' && !pointer.horizontal) {
        pointer.horizontal = true;
        container.setPointerCapture(event.pointerId);
      }
      rotate(pointer.dragX + (event.pointerType === 'touch' ? 0 : deltaY * 0.003), pointer.dragY + deltaX * 0.005);
    } else if (event.pointerType === 'mouse') {
      const bounds = container.getBoundingClientRect();
      targetX = 0.12 + dragX + ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.07;
      targetY = -0.46 + dragY + ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.1;
      requestRender();
    }
  }
  function onPointerUp() {
    if (pointer && container.hasPointerCapture(pointer.id)) container.releasePointerCapture(pointer.id);
    pointer = null;
    container.classList.remove('is-dragging');
  }
  function onPointerLeave() {
    if (!pointer) { targetX = 0.12 + dragX; targetY = -0.46 + dragY; requestRender(); }
  }
  function onKeyDown(event: KeyboardEvent) {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'Home') reset();
    else rotate(dragX + (event.key === 'ArrowUp' ? -0.1 : event.key === 'ArrowDown' ? 0.1 : 0), dragY + (event.key === 'ArrowLeft' ? -0.15 : event.key === 'ArrowRight' ? 0.15 : 0));
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
  observer.observe(container);
  resizeObserver.observe(container);
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
      onPointerUp();
      observer.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('lostpointercapture', onPointerUp);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      sculpture.traverse((object) => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    },
  };
}
