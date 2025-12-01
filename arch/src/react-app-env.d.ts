/// <reference types="react-scripts" />

// Add TypeScript type definitions for JSX
interface IntrinsicElements {
  [elemName: string]: any;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
