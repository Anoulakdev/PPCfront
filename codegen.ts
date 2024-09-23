import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // schema: 'http://localhost:8081/v1/api-graphql',
  schema: 'https://api-ppcd.edl.com.la/v1/api-graphql',
  documents: ['src/**/**/*.ts'],
  generates: {
    './src/lib/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  },
  ignoreNoDocuments: true
}

export default config
