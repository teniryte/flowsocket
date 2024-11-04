import { PrismaClient } from '@prisma/client';
import { IApplicationOptions } from '../interfaces/application-options.interface';
import { mergeDefaults } from '../util';
import { getClassMethods, getFlowSocketClass } from '../util/classes.util';
import { getClassMethodsByRole, getMetadata } from '../util/meta.util';
import { Module } from './module.class';
import { CServer as Server } from './server.class';
import { Service } from './service.class';

export class Application {
  name: string;
  options: IApplicationOptions;
  Class: any;
  server: Server;

  modules: Module[];

  get application() {
    return this;
  }

  constructor(name: string, Class: any, options: IApplicationOptions) {
    this.name = name;
    this.Class = Class;
    this.options = mergeDefaults(options, {
      path: process.cwd(),
      host: 'localhost',
      port: 3000,
    });
    this.server = new Server(this.options.host, this.options.port);
    this.modules =
      options.modules?.map(
        (Module) => new Module(this, getMetadata(Module, 'module')),
      ) || [];
  }

  getEndpointsMap() {
    const endpointsMap: { [key: string]: string[] } = {};
    this.modules.forEach((module) => {
      const endpoints = module.getEndpoints();
      endpoints.forEach((endpoint) => {
        const code = endpoint.method.toString();
        const args = code
          .split(`${endpoint.name}(`)[1]
          .split(')')[0]
          .split(',')
          .map((val) => val.trim());
        endpointsMap[`${endpoint.controllerName}/${endpoint.endpointName}`] =
          args;
      });
    });
    return endpointsMap;
  }

  initSocketEvents() {
    const methods = getClassMethodsByRole(this.constructor, 'socket-event');
    methods.forEach((method) => {
      this.server.on(method.data.eventName, method.method.bind(this));
    });
    this.server.on('endpointsMap', () => {
      return this.getEndpointsMap();
    });
    this.modules.forEach((module) => {
      const endpoints = module.getEndpoints();
      endpoints.forEach((endpoint) => {
        this.server.on(
          `endpoint:${endpoint.controller.name}/${endpoint.endpointName}`,
          async (...args: any[]) => {
            return await endpoint.method.apply(endpoint.controller, args);
          },
        );
      });
    });
  }

  start() {
    this.initSocketEvents();
    this.server.start();
    console.log(
      `Listening application ${this.name} on ${this.options.host}:${this.options.port}...`,
    );
  }

  emit(event: string, ...args: any[]) {
    this.server.emit(event, ...args);
  }

  resolveService(name: string) {
    let moduleName: string = null;
    if (name.includes('.')) {
      [moduleName, name] = name.split('.');
    }
    let resolvedService: Service = null;
    this.modules.forEach((module) => {
      if ((moduleName && module.name !== moduleName) || !module.services[name])
        return;
      resolvedService = module.services[name];
    });
    return resolvedService;
  }
}