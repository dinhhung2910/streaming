const isProduction = (process.env.NODE_ENV == 'production');

export const BASE_SERVER = isProduction ?
  'http://149.28.138.64' :
  'http://localhost:3000';

export const BASE_URL = isProduction ?
  BASE_SERVER + '/streaming' :
  BASE_SERVER;

export const BASE_API_URL = BASE_SERVER + '/streaming/server';

export const HIGH_DPI_MEDIA_QUERY = `
only screen and (-webkit-min-device-pixel-ratio: 1.3),
only screen and (-o-min-device-pixel-ratio: 13/10),
only screen and (min-resolution: 120dpi)`;
