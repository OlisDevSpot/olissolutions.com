import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  rules: {
    'react-refresh/only-export-components': 'off',
    'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
    'react/no-unstable-context-value': 'off',
    'react/no-array-index-key': 'off',
    'react/no-nested-component-definitions': 'off',
    'node/prefer-global/process': 'off',
  },
})
