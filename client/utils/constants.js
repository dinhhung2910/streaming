export const BASE_SERVER = process.env.NEXT_PUBLIC_SERVER_URL;
export const SYNC_SERVER = process.env.NEXT_PUBLIC_SYNC_URL;

export const BASE_API_URL = BASE_SERVER + process.env.NEXT_PUBLIC_API_URL;

export const HIGH_DPI_MEDIA_QUERY = `
only screen and (-webkit-min-device-pixel-ratio: 1.3),
only screen and (-o-min-device-pixel-ratio: 13/10),
only screen and (min-resolution: 120dpi)`;
