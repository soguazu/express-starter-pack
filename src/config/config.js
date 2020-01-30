/* eslint-disable no-undef */
/*
 * Create and export configuration variables
 *
 */

// Container for all environments
const environments = {};

// Staging (default) environment
environments.development = {
  envName: 'development',
  hashingSecret: process.env.MY_SECRET,
  httpPort: 8080,
  aws_table_name: process.env.TABLE_NAME,
  aws_config: {
    region: 'local',
    endpoint: process.env.ENDPOINT,
  },
};

// Production environment
environments.production = {
  envName: 'production',
  hashingSecret: process.env.MY_SECRET,
  httpPort: 8080,
  aws_table_name: process.env.TABLE_NAME,
  aws_config: {},
};

environments.test = {
  envName: 'test',
  hashingSecret: process.env.MY_SECRET,
  httpPort: 80,
  aws_table_name: process.env.TABLE_NAME,
  aws_config: {
    region: 'local',
    endpoint: process.env.ENDPOINT,
  },
};

// Determine which environment was passed as a command-line argument
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string'
      ? process.env.NODE_ENV.toLowerCase()
      : '',
  // Check that the current environment is one of the environments above, if not default to staging
  environmentToExport =
    typeof environments[currentEnvironment] === 'object'
      ? environments[currentEnvironment]
      : environments.development;

// Export the module
module.exports = environmentToExport;
