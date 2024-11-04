import { addMethodRole } from '../util/meta.util';

export const Endpoint = (endpointName?: string) => {
  return (target: any, name: any, descriptor: any) => {
    endpointName = endpointName || name;
    addMethodRole(descriptor.value, 'endpoint', { endpointName });
    return target;
  };
};
