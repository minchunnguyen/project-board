module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {},
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  modulePaths: ['<rootDir>/src/utils'],
  // coverageThreshold: {
  //   global: {
  //     statements: 20,
  //     branches: 20,
  //     functions: 20,
  //     lines: 10,
  //   }
  // }
};
