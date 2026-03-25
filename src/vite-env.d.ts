/// <reference types="vite/client" />

// Allow image imports with vite-imagetools query parameters
declare module '*?w=800&format=webp&quality=75' {
  const src: string;
  export default src;
}

declare module '*?w=800&format=webp&quality=80' {
  const src: string;
  export default src;
}

declare module '*?w=400&format=webp&quality=80' {
  const src: string;
  export default src;
}
