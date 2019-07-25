module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "import/no-extraneous-dependencies": [
      2,
      { "devDependencies": [
        "**/*.stories.jsx", 
        "**/*.spec.*", 
        "./webpack.config.babel.js",
        "./jest.setupAfterEnv.js"
      ]}
    ],
  },
};
