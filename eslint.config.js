import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  extends: [
    globalIgnores(['**/+types/', 'vite.config.ts', '*.config.js']),
    js.configs.recommended,
    react.configs.flat.recommended,
    reactHooks.configs['recommended-latest'],
    reactRefresh.configs.vite,
    tseslint.configs.recommended,
  ],
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    ecmaVersion: 2022,
    globals: {
      ...globals.es2022,
      ...globals.browser,
    },
  },
  settings: {
    react: {
      version: 'detect',
      defaultVersion: '^19.0.0',
    },
  },
  rules: {
    // Legacy
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',

    // Disabled
    'import/prefer-default-export': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-refresh/only-export-components': 'off',

    // Warning
    '@typescript-eslint/no-empty-object-type': 'warn',

    // Error
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
})
