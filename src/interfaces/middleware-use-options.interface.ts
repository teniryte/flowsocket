import { Controller } from '../classes/controller.class';

export interface IMiddlewareUseOptions {
  controller?: Controller;
  name?: string;
  dto?: any;
  local?: any;
}
