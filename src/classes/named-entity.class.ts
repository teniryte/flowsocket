import { getFlowSocketClass } from '../util/classes.util';
import { Application } from './application.class';
import { Module } from './module.class';

export class NamedEntity {
  module: Module;
  options: {
    name?: string;
  };

  getName(): string {
    const Class = getFlowSocketClass(this.constructor);
    return (
      this.options?.name ||
      Class.name
        .split(/([^^])[A-Z]/)
        .slice(0, 2)
        .join('')
        .toLowerCase() ||
      this.module.name
    );
  }

  get name() {
    return this.getName();
  }
}
