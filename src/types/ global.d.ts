import '@jest/types';

declare global {
  namespace NodeJS {
    interface Global {
      fetch: typeof fetch;
    }
  }
}

export {};
