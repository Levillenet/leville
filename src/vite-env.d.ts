/// <reference types="vite/client" />

// Allow image imports with vite-imagetools query parameters
declare module '*?w=800&format=webp&quality=75' {
  const src: string;
  export default src;
}
