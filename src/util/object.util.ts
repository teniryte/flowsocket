import { each, set } from 'lodash';
import { TPrimitiveNestedObject } from '../types/primitive-nested-object.type';

export const mergeDefaults = (source: any, defaults: any) => {
  const flatSource = flattenObject(source);
  const flatDefaults = flattenObject(defaults);
  const result = {};
  each(flatDefaults, (value, key) => {
    if (typeof flatSource[key] !== 'undefined') {
      return set(result, key, flatSource[key]);
    }
    set(result, key, value);
  });
  return unflattenObject(result);
};

export const unflattenObject = (flatObject: TPrimitiveNestedObject) => {
  const result = {};
  each(flatObject, (value, key) => {
    const keys = key.split('.');
    set(result, keys, value);
  });
  return result;
};

export const flattenObject = <T extends any>(
  obj: T,
  prefix: string = '',
  result: Record<string, any> = {},
): Record<string, any> => {
  if (!obj) return obj;
  if (Array.isArray(obj)) {
    return obj.map((val) => flattenObject(val));
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flattenObject(value, newKey, result);
      } else {
        result[newKey] = flattenObject(value);
      }
    }
  }
  return result;
};
