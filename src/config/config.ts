export const PORT = parseInt(process.env.PORT, 10) || 3000;
export const HOST = process.env.HOST || 'localhost';
export const SCHEME = process.env.SCHEME || 'http';

export const MAXIMUM_LIMIT = parseInt(process.env.MAXIMUM_LIMIT, 10) || 1000;
export const DEFAULT_LIMIT = parseInt(process.env.DEFAULT_LIMIT, 10) || 100;
export const MINIMUM_INTEGER = parseInt(process.env.MINIMUM_INTEGER, 10) || 0;
export const DEFAULT_INTEGER_1 =
  parseInt(process.env.DEFAULT_INTEGER_1, 10) || 0;
export const DEFAULT_INTEGER_2 =
  parseInt(process.env.DEFAULT_INTEGER_2, 10) || 0;
export const DEFAULT_REPLACEMENT_1 = process.env.DEFAULT_REPLACEMENT_1 || '';
export const DEFAULT_REPLACEMENT_2 = process.env.DEFAULT_REPLACEMENT_2 || '';
