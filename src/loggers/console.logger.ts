import moment from 'moment';
import { Logger } from '../interfaces/logger.interface';
import { LogType } from '../enums/log-type.enum';
import 'colors';

export class ConsoleLogger implements Logger {
  private getPrefix(type: LogType) {
    let logType = `[${type.toUpperCase()}]`;

    if (type === LogType.Log) {
      logType = logType.green;
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
    console.log(this.getPrefix(LogType.Log), ...vals);
  }

  public info(...vals: any[]) {
    console.info(this.getPrefix(LogType.Info), ...vals);
  }

  public warning(...vals: any[]) {
    console.warn(this.getPrefix(LogType.Warning), ...vals);
  }

  public error(...vals: any[]) {
    console.error(this.getPrefix(LogType.Error), ...vals);
  }
}
