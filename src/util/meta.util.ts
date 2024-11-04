import { TMethodRole } from '../types/method-role.type';
import { getClassMethods } from './classes.util';

export const setMetadata = (target: any, key: string, value: any) => {
  Reflect.defineMetadata(key, value, target);
};

export const getMetadata = (target: any, key: string) => {
  return Reflect.getMetadata(key, target);
};

export const addMethodRole = (
  method: (...args: any) => any,
  type: string,
  data: any,
) => {
  const roles = getMetadata(method, 'roles') || [];
  roles.push({ type, data });
  setMetadata(method, 'roles', roles);
};

export const getClassMethodsByRole = (Class: any, role: string) => {
  const methods = getClassMethods(Class);
  return Object.values(methods)
    .filter((method: (...args: any) => any) => {
      const roles = getMetadata(method, 'roles') || [];
      return roles.some((r: TMethodRole) => r.type === role);
    })
    .map((method: (...args: any) => any) => ({
      name: method.name,
      method,
      role,
      data: getMetadata(method, 'roles').find(
        (item: TMethodRole) => item.type === role,
      )?.data,
    }));
};
