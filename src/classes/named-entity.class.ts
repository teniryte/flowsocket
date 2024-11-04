import { camelCase } from 'lodash';
import { trimClassType } from '../util';
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
      camelCase(trimClassType(Class.name)) ||
      this.module.name
    );
  }

  get name() {
    return this.getName();
  }
}
