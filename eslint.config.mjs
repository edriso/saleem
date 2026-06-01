import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'dev-dist', 'node_modules', 'coverage', 'playwright-report', 'test-results'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Saleem is bilingual: no user-facing text may be hardcoded in JSX. Every
      // visible string must come from the i18n layer (t / tr). Only a handful of
      // language-neutral separator glyphs are allowed inline.
      'react/jsx-no-literals': [
        'error',
        {
          allowedStrings: ['·', '/', '=', '½', '¼', '—', '•'],
          ignoreProps: true,
          noStrings: false,
        },
      ],
    },
  },
  {
    // Tests and config files may use literal strings freely.
    files: ['**/*.test.{ts,tsx}', 'vite.config.ts', 'vitest.setup.ts', '*.config.{ts,mjs,cjs,js}'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      'react/jsx-no-literals': 'off',
    },
  },
  eslintConfigPrettier,
);
