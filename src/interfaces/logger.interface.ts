import { LogType } from '../enums/log-type.enum';

export interface Logger {
  log(...vals: any[]): void;
  info(...vals: any[]): void;
  warning(...vals: any[]): void;
  error(...vals: any[]): void;
}
