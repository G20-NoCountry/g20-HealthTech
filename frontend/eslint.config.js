import globals from 'globals';
import { defineConfig } from '@eslint/config-helpers';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    extends: [
      'eslint:recommended',
      typescriptEslint.configs.recommended,
      reactPlugin.configs['jsx-runtime'],
      reactHooksPlugin.configs.recommended,
      reactRefreshPlugin.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // project: './tsconfig.json', // Descomenta si quieres type-aware linting
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
  prettier,
]);
