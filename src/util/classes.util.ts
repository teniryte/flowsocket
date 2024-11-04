import { getMetadata } from './meta.util';

export const getClassMethodNames = (Class: any) => {
  let keys: string[] = [];
  let proto = Class.prototype;
  while (proto) {
    keys = [...keys, ...Reflect.ownKeys(proto).map((val) => val.toString())];
    proto = proto.__proto__;
  }
  return keys;
};

export const getClassMethods = (Class: any) => {
  const keys = getClassMethodNames(Class);
  const result: any = {};
  keys.forEach((key) => {
    if (key === 'constructor') return;
    const method = Class.prototype[key];
    if (typeof method !== 'function') return;
    result[key] = method;
  });
  return result;
};

export const getFlowSocketClass = (Class: any) => {
  let cons = Class;
  while (cons) {
    if (!cons._flowSocketWrapped) {
      return cons;
    }
    cons = cons?.prototype?.__proto__?.constructor;
  }
  return Class;
};
