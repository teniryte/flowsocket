import { IMiddlewareOptions } from '../interfaces/middleware-options.interface';
import { IMiddlewareUseOptions } from '../interfaces/middleware-use-options.interface';
import { Application } from './application.class';
import { Controller } from './controller.class';
import { Module } from './module.class';

export class Middleware {
  public name: string;
  public application: Application;

  constructor(
    public readonly module: Module,
    private readonly meta: IMiddlewareOptions,
  ) {
    this.application = module.application;
    this.name = meta.name || meta.inject || this.constructor.name;
  }

  async use(options: IMiddlewareUseOptions): Promise<any> {}
}
