/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@routes(.*)$': '<rootDir>/routes$1',
    '^@services(.*)$': '<rootDir>/services$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
    '^@middlewares(.*)$': '<rootDir>/middlewares$1',
    '^@data(.*)$': '<rootDir>/data$1',
    '^@decorators(.*)$': '<rootDir>/decorators$1',
    '^@module(.*)$': '<rootDir>/module$1',
  },
};
