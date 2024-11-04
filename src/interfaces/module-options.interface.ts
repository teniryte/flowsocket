import { Controller } from '../classes/controller.class';
import { Service } from '../classes/service.class';

export interface IModuleOptions {
  name?: string;
  services?: (typeof Service)[];
  controllers?: (typeof Controller)[];
}
