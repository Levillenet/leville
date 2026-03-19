/// <reference types="vite/client" />

// vite-imagetools: allow image imports with query parameters
declare module '*?w=800&format=webp&quality=75' {
  const value: string;
  export default value;
}
