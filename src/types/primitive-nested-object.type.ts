import { TPrimitive } from './primitive.type';

export type TPrimitiveNestedObject = {
  [key: string]:
    | TPrimitive
    | (TPrimitive | TPrimitiveNestedObject)[]
    | TPrimitiveNestedObject;
};
