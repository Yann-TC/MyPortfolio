/// <reference types="vite/client" />

import 'react';

declare module 'react' {
  interface CSSProperties {
    '--reveal-index'?: number;
  }
}
declare global {
  const __ASSET_VERSION__: string;
}
