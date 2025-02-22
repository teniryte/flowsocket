import 'reflect-metadata';
import { setMetadata } from '../util/meta.util.js';
import type { IServiceOptions } from '../interfaces/service-options.interface.js';
import { IMiddlewareOptions } from '../interfaces/middleware-options.interface.js';

export const AppMiddleware = (options: IMiddlewareOptions = {}) => {
  return (target: any): any => {
    setMetadata(target, 'middleware', options);
    setMetadata(target, 'flowSocketType', 'middleware');
    return target;
  };
};
