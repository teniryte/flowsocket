import { Module } from '../classes/module.class';

export interface IApplicationOptions {
  path?: string;
  host?: string;
  port?: number;
  modules?: (typeof Module)[];
}
