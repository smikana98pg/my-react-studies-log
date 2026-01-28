export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(@supabase)/)',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}',
  ],
  clearMocks: true,
  resetMocks: true,
  // rootDir を明示的に指定
  rootDir: '.',
  // モックの場所を明示的に指定
  moduleDirectories: ['node_modules', '<rootDir>'],
}