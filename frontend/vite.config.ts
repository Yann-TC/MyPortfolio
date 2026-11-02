import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Changes on every build/dev start so browsers refetch public PDFs instead of using a stale cache.
    __ASSET_VERSION__: JSON.stringify(Date.now().toString(36)),
  },
});
