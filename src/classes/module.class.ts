import { each } from 'lodash';
import { IModuleOptions } from '../interfaces/module-options.interface';
import { getClassMethodsByRole, getMetadata } from '../util/meta.util';

import { Application } from './application.class';
import { Controller } from './controller.class';
import { NamedEntity } from './named-entity.class';
import { Service } from './service.class';

export class Module extends NamedEntity {
  application?: Application;
  services?: {
    [name: string]: Service;
  } = {};
  controllers?: {
    [name: string]: Controller;
  } = {};

  constructor(application: Application, options: IModuleOptions) {
    super();
    this.options = options;
    this.application = application;
    options.services?.forEach((Service) => {
      const meta = getMetadata(Service, 'service');
      const service = new Service(this, meta, Service);
      this.services[service.name] = service;
    });
    options.controllers?.forEach((Controller) => {
      const meta = getMetadata(Controller, 'controller');
      const controller = new Controller(this, meta, Controller);
      this.controllers[controller.name] = controller;
    });

    this.application.logger.info(`Module «${this.name}» initialized.`);
  }

  getEndpoints() {
    const endpoints: {
      controller: Controller;
      name: string;
      endpointName: string;
      method: (...args: any) => any;
      controllerName: string;
    }[] = [];
    each(this.controllers, (controller, name) => {
      const methods = getClassMethodsByRole(controller.constructor, 'endpoint');
      methods.forEach((method) => {
        endpoints.push({
          controller,
          name: method.name,
          endpointName: method.data.endpointName,
          method: method.method,
          controllerName: controller.name,
        });
      });
    });
    return endpoints;
  }
}
