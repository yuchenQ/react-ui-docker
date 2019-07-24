module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      { targets: '> 0.25%, not dead', modules: false },
    ],
    '@babel/preset-react',
  ];

  const plugins = ['@babel/plugin-syntax-dynamic-import'];

  return {
    presets,
    plugins,
  };
};
