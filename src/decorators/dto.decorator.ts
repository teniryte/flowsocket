import { setMetadata } from '../util';

export const Dto = (DtoClass: any) => {
  return (Class: any, name: string, _: number) => {
    setMetadata(Class[name], 'dto', DtoClass);
  };
};
