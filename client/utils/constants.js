const isProduction = (process.env.NODE_ENV == 'production');

export const BASE_URL = isProduction ?
  'https://kaito-bk.com/streaming' :
  'http://localhost:3000';

export const BASE_API_URL = 'https://kaito-bk.com/streaming/server';

export const HIGH_DPI_MEDIA_QUERY = `
only screen and (-webkit-min-device-pixel-ratio: 1.3),
only screen and (-o-min-device-pixel-ratio: 13/10),
only screen and (min-resolution: 120dpi)`;
