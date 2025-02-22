import 'reflect-metadata';
import { setMetadata } from '../util/meta.util.js';
import type { IServiceOptions } from '../interfaces/service-options.interface.js';

export const AppService = (options: IServiceOptions = {}) => {
  return (target: any): any => {
    setMetadata(target, 'service', options);
    setMetadata(target, 'flowSocketType', 'service');
    return target;
  };
};
