import { ConsoleLogger } from './loggers/console.logger';

export { App } from './decorators/app.decorator';
export { OnSocketEvent } from './decorators/on-socket-event.decorator';
export { globals } from './core/globals';
export { start } from './core/start';
export { AppModule } from './decorators/module.decorator';
export { Module } from './classes/module.class';
export { AppService } from './decorators/service.decorator';
export { Service } from './classes/service.class';
export { Controller } from './classes/controller.class';
export { timeout } from './util/util.util';
export { AppController } from './decorators/controller.decorator';
export { Inject } from './decorators/inject.decorator';
export { getMetadata } from './util/meta.util';
export { Endpoint } from './decorators/endpoint.decorator';
export { Application } from './classes/application.class';
export { Dto } from './decorators/dto.decorator';

export const logger = new ConsoleLogger();
