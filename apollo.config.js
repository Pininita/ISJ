module.exports = {
  client: {
    service: {
      name: 'isj-inventory',
      // Si tienes un endpoint GraphQL remoto:
      url: 'http://127.0.0.1:8000/graphql/', // Cambia por tu URL
      
      // O si tienes archivos de schema local:
      // localSchemaFile: './src/schema.graphql',
    },
    includes: [
      'src/**/*.{js,jsx,ts,tsx}',
      'src/gql/**/*.{js,jsx,ts,tsx}'
    ],
    excludes: [
      'node_modules/**/*'
    ]
  }
};