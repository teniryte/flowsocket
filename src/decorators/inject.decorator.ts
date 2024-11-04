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
            const service = (this as any).application.resolveService(name);
            (this as any)[name] = service;
          });
        });
      }
    }
    return InjectedClass;
  };
}
