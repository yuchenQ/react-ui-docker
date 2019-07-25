module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      { targets: '> 0.25%, not dead' },
    ],
    '@babel/preset-react',
  ];

  const plugins = ['@babel/transform-runtime', '@babel/plugin-syntax-dynamic-import'];

  return {
    presets,
    plugins,
  };
};
