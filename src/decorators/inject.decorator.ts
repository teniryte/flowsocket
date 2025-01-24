import { LocalStorage } from '../classes/localStorage.class';

export function Inject(...names: string[]) {
  return function injectClassDecorator<T extends { new (...args: any[]): {} }>(
    Class: T,
  ) {
    class InjectedClass extends Class {
      static _flowSocketWrapped = true;

      constructor(...args: any) {
        super(...args);
        Promise.resolve().then(() => {
          names.forEach((name) => {
            if (name === 'localStorage') {
              (this as any)[name] = new LocalStorage((this as any).application);
            } else {
              const service = (this as any).application.resolveService(name);
              (this as any)[name] = service;
            }
          });
        });
      }
    }
    return InjectedClass;
  };
}
