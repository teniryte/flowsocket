import { PrismaClient } from '@prisma/client';

const container = {
  get(token: string) {
    // Provide the instance associated with the token
    if (token === 'prisma') {
      return new PrismaClient();
    }
    throw new Error(`No provider found for token: ${token}`);
  },
};

export function Injectable<T extends { new (...args: any[]): {} }>(
  constructor: T,
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      const injections = Reflect.getMetadata('injections', constructor) || [];
      injections.forEach(({ propertyKey, token }: any) => {
        Object.defineProperty(this, propertyKey, {
          get: function () {
            // Lazy initialization
            const value = container.get(token);
            Object.defineProperty(this, propertyKey, {
              value,
              writable: false,
              enumerable: true,
            });
            return value;
          },
          configurable: true,
          enumerable: true,
        });
      });
    }
  };
}
