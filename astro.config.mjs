import { defineConfig } from 'astro/config';
export default defineConfig({
  devToolbar: { enabled: false },
  site: 'https://digitalks-ai.com', output: 'static', trailingSlash: 'always',
  i18n: { defaultLocale: 'es', locales: ['es', 'en'], routing: { prefixDefaultLocale: false } },
  build: { format: 'directory' },
});
