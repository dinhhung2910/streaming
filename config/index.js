const config = {
  APP_PORT: process.env.APP_PORT,
  MONGO_URI: process.env.MONGO_URI,

  ASSETS_BASE_URL: process.env.ASSETS_BASE_URL,
  VIDEO_BASE_URL: process.env.VIDEO_BASE_URL,
  SERVER_BASE_URL: process.env.SERVER_BASE_URL,
  
  DEFAULT_FILE_NAME: process.env.DEFAULT_FILE_NAME,
};

module.exports = config;