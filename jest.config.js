module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
