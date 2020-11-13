const isProduction = (process.env.NODE_ENV == 'production');

export const BASE_URL = isProduction ?
  'http://kaito-bk.com/streaming' :
  'http://localhost:3000';

export const BASE_API_URL = 'http://kaito-bk.com/streaming/server';
