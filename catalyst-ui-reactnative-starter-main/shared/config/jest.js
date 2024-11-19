module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['e2e'],
  setupFilesAfterEnv: [require.resolve('./jest.setup.js')],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transform: {
    '^.+\\.(js|ts|tsx)$': ['babel-jest', {configFile: `${__dirname}/babel.js`}],
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        babelConfig: require('./babel'),
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@react-navigation)/)',
  ],
  haste: {
    defaultPlatform: 'android',
    platforms: ['android', 'ios', 'native'],
  },
  collectCoverage: true,
  coverageReporters: ['lcov', 'json'],
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
