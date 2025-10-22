import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  rules: {
    'react-refresh/only-export-components': 'off', // For shadcn/ui Button.tsx exporting non-react components
    'node/prefer-global/process': 'off',
    'react/no-context-provider': 'off',
  },
})
