import { logger } from '..';
import { IControllerOptions } from '../interfaces/controller-options.interface';
import { Application } from './application.class';
import { Module } from './module.class';
import { NamedEntity } from './named-entity.class';

export class Controller extends NamedEntity {
  application: Application;
  module: Module;
  Class: typeof Controller;

  constructor(
    module: Module,
    options: IControllerOptions,
    Class: typeof Controller,
  ) {
    super();
    this.options = options;
    this.Class = Class;
    this.module = module;
    this.application = module.application;

    logger.info(`Controller «${this.name}» initialized.`);
  }
}
