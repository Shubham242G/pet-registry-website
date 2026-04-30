// utils/logger.ts
const isDevelopment = process.env.NODE_ENV === 'development';

// List of error messages to ignore (auth errors)
const ignoredErrorPatterns = [
  'credentials',
  'invalid',
  '401',
  '400',
  'user exists',
  'email already',
  'username already',
  'session expired',
  'token invalid',
  'bad request'
];

export const logger = {
  error: (...args: any[]) => {
    // Check if this error should be ignored
    const errorString = JSON.stringify(args).toLowerCase();
    const shouldIgnore = ignoredErrorPatterns.some(pattern => 
      errorString.includes(pattern.toLowerCase())
    );
    
    if (isDevelopment && !shouldIgnore) {
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