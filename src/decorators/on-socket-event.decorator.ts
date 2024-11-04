import { addMethodRole } from '../util/meta.util';

export const OnSocketEvent = (eventName: string) => {
  return (target: any, name: any, descriptor: any) => {
    addMethodRole(descriptor.value, 'socket-event', { eventName });
    return target;
  };
};
