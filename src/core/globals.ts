import { Application } from '../classes/application.class';
import { TGlobals } from '../types/globals.type';

const __globals: TGlobals = {
  applications: {},
};

export const globals = <K extends keyof TGlobals>(
  key: K,
  value?: TGlobals[K], // Задаём тип значения, соответствующий ключу
): TGlobals[K] => {
  if (value !== undefined) {
    __globals[key] = value as TGlobals[K];
  }
  return __globals[key];
};
