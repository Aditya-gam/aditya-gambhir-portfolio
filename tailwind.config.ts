import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Theme configuration is handled in globals.css with @theme directive
      // This file exists for shadcn/ui compatibility
    },
  },
  plugins: [],
};

export default config;
