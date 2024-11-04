import { Module } from './module.class';

import type { IServiceOptions } from '../interfaces/service-options.interface';
import { Application } from './application.class';
import { NamedEntity } from './named-entity.class';

export class Service extends NamedEntity {
  application: Application;
  module: Module;
  Class: typeof Service;

  constructor(module: Module, options: IServiceOptions, Class: typeof Service) {
    super();
    this.Class = Class;
    this.module = module;
    this.application = module.application;
  }
}
