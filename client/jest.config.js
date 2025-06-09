module.exports = {
    testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  setupFiles: ['<rootDir>/src/jest.polyfills.js'],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
    "transformIgnorePatterns": [
      "/node_modules/(?!axios|msw)/"
    ]
  }