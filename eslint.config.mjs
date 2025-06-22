import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ),
  {
    plugins: {
      'jsx-a11y': (await import('eslint-plugin-jsx-a11y')).default,
      prettier: (await import('eslint-plugin-prettier')).default,
    },
    rules: {
      'prettier/prettier': ['error'],
    },
  },
];

export default eslintConfig;
