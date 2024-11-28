import moment from 'moment';
import { Logger } from '../interfaces/logger.interface';
import { LogType } from '../enums/log-type.enum';
import 'colors';
import { LogLevel, LogLevelNames } from '../enums/log-level.enum';

export class ConsoleLogger implements Logger {
  constructor(private readonly logLevel: LogLevel) {}

  private getPrefix(type: LogType) {
    let logType = `[${type.toUpperCase()}]`.padStart(7, ' ');

    if (type === LogType.Log) {
      logType = logType.grey;
    } else if (type === LogType.Info) {
      logType = logType.blue;
    } else if (type === LogType.Warning) {
      logType = logType.yellow;
    } else if (type === LogType.Error) {
      logType = logType.red;
    }

    return `${moment().format('YYYY-MM-DD HH:mm:ss')}`.grey + ' ' + logType;
  }

  public log(...vals: any[]) {
    if (this.logLevel < LogLevel.Log) return;
    console.log(this.getPrefix(LogType.Log), ...vals);
  }

  public info(...vals: any[]) {
    if (this.logLevel < LogLevel.Info) return;
    console.info(this.getPrefix(LogType.Info), ...vals);
  }

  public warning(...vals: any[]) {
    if (this.logLevel < LogLevel.Warning) return;
    console.warn(this.getPrefix(LogType.Warning), ...vals);
  }

  public error(...vals: any[]) {
    if (this.logLevel < LogLevel.Error) return;
    console.error(this.getPrefix(LogType.Error), ...vals);
  }
}
