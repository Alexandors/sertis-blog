module.exports = {
  displayName: 'Blog',
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!app/index.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
    '!app/pages/not-found-page/*',
    '!app/translations/messages.js',
    '!app/sw.js',
  ],
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 20,
      functions: 10,
      lines: 20,
    },
  },
  moduleDirectories: ['node_modules', 'internals/testing', 'app/shared', 'app/utils', 'app/translations', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/internals/testing/test-bundler.js',
    '<rootDir>/internals/mocks/matchMedia.js',
    '@testing-library/react/cleanup-after-each',
    'jest-dom/extend-expect',
  ],
  setupFiles: ['raf/polyfill'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
