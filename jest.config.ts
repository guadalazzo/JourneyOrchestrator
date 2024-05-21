import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest', // Add this line to handle TypeScript files
  },
  testEnvironment: 'jest-environment-node', // Commonly used for React projects
};

export default config;
