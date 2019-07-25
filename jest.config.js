module.exports = {
  setupFilesAfterEnv: ['./jest.SetupAfterEnv.js'],
  testMatch: ['**/*.spec.js?(x)'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
};
