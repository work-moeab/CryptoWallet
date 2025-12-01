// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    'no-unused-vars': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-unused-vars': [
      'off',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  ignores: ['**/dist/**', '**/node_modules/**', '**/build/**'],
})
