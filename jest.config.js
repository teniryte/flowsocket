// jest.config.js
module.exports = {
  preset: 'ts-jest', // Use ts-jest preset for TypeScript support
  testEnvironment: 'node', // Set test environment to Node.js
  testMatch: ['**/tests/*.test.ts', '**/tests/**/*.test.ts'], // Specify where test files are located
  moduleFileExtensions: ['ts', 'js'], // Recognize both TypeScript and JavaScript files
  globals: {
    'ts-jest': {
      isolatedModules: true, // Enable isolated modules mode for faster testing
    },
  },
  clearMocks: true, // Automatically clear mock calls and instances between every test
};
