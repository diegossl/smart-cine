module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
    '^@domain/(.*)$': '<rootDir>/domain/$1',
    '^@use-cases/(.*)$': '<rootDir>/use-cases/$1',
    '^@infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
    '^@adapters/(.*)$': '<rootDir>/adapters/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**'],
  coverageDirectory: '../coverage',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      statements: 75,
    },
  },
  testEnvironment: 'node',
};
