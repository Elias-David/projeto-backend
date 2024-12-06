module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/server.js',
      '!src/config/*.js'
    ],
    coverageDirectory: 'coverage',
    setupFiles: ['<rootDir>/tests/setup.js']
  };