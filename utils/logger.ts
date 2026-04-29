// utils/logger.ts
const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = {
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args);
    }
    // In production, you could send to an error tracking service like Sentry
  },
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
};