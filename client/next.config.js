module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
  basePath: process.env.NODE_ENV == 'production' ? '/streaming' : '',
  assetPrefix: process.env.NODE_ENV == 'production' ? '/streaming' : '',
};
