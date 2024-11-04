import { Application } from '../classes/application.class.js';
import { globals } from '../core/globals.js';
import type { IApplicationOptions } from '../interfaces/application-options.interface.js';
import 'reflect-metadata';
import { setMetadata } from '../util/meta.util.js';

export function App(options: IApplicationOptions = {}) {
  return function injectClassDecorator<T extends typeof Application>(Class: T) {
    const application = new Class(Class.name, Class, options);
    const apps = globals('applications');
    apps[Class.name] = application;
    setMetadata(Class, 'application', application);
    setMetadata(Class, 'flowSocketType', 'application');
    return Class;
  };
}
