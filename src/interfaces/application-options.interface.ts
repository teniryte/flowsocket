import { Module } from '../classes/module.class';
import { LogLevel } from '../enums/log-level.enum';

export interface IApplicationOptions {
  path?: string;
  host?: string;
  port?: number;
  logLevel?: string;
  modules?: (typeof Module)[];
}
