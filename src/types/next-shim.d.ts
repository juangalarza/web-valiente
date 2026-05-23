declare module 'next/types.js' {
  export type ResolvingMetadata = any;
  export type ResolvingViewport = any;
  export type Metadata = any;
  export type Viewport = any;
}

declare module 'next' {
  const next: any;
  export type NextConfig = any;
  export type Metadata = any;
  export type Viewport = any;
  export default next;
}

declare module 'next/image' {
  const Image: any;
  export default Image;
}

declare module 'next/link' {
  const Link: any;
  export default Link;
}

declare module 'next/navigation' {
  export const useParams: any;
  export const useRouter: any;
  export const usePathname: any;
  export const useSearchParams: any;
}

declare module 'next/font/google' {
  export const Cormorant_Garamond: any;
  export const Bebas_Neue: any;
  export const Barlow_Condensed: any;
  export const Barlow: any;
}
