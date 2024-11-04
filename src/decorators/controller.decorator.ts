import 'reflect-metadata';
import { setMetadata } from '../util/meta.util.js';
import type { IServiceOptions } from '../interfaces/service-options.interface.js';
import type { IControllerOptions } from '../interfaces/controller-options.interface.js';

export const AppController = (options: IControllerOptions = {}) => {
  return (target: any): any => {
    setMetadata(target, 'controller', options);
    setMetadata(target, 'flowSocketType', 'controller');
    return target;
  };
};
