module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  maxConcurrency: 1,
  testTimeout: 999999,
};
