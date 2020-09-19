module.exports = {
  displayName: 'BlogServer',
  collectCoverageFrom: [
    'src/**/*.test.*.{js,jsx}',
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 20,
      functions: 10,
      lines: 20,
    },
  },
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
  },
  setupFilesAfterEnv: [
  ]
};
