// vite-imagetools type declarations
declare module '*.jpg?w=800&format=webp&quality=75' {
  const src: string;
  export default src;
}

declare module '*.jpeg?w=800&format=webp&quality=75' {
  const src: string;
  export default src;
}

declare module '*.png?w=800&format=webp&quality=75' {
  const src: string;
  export default src;
}
