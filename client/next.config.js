const basePath = process.env.NODE_ENV == 'production' ? '/streaming' : '';
const assetPrefix = process.env.NODE_ENV == 'production' ? '/streaming' : '';

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
  basePath: basePath,
  assetPrefix: assetPrefix,
  async redirects() {
    return [
      {
        source: basePath + '/',
        destination: basePath + '/movies',
        permanent: true,
      },
    ];
  },
};
