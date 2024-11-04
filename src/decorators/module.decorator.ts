import 'reflect-metadata';
import { setMetadata } from '../util/meta.util.js';
import { IModuleOptions } from '../interfaces/module-options.interface.js';

export const AppModule = (options: IModuleOptions = {}) => {
  return (target: any): any => {
    setMetadata(target, 'module', options);
    setMetadata(target, 'flowSocketType', 'module');
    return target;
  };
};
