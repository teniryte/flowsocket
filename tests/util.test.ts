import { flattenObject } from '../src/util';
import { mergeDefaults, unflattenObject } from '../src/util/object.util';

describe('object util', () => {
  it('flattens an object', () => {
    const source = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
        f: [
          1,
          2,
          {
            x: 4,
            y: {
              z: 5,
            },
          },
        ],
      },
    };
    expect(flattenObject(source)).toEqual({
      a: 1,
      'b.c': 2,
      'b.d.e': 3,
      'b.f': [
        1,
        2,
        {
          x: 4,
          'y.z': 5,
        },
      ],
    });
  });

  it('unflattens an object', () => {
    const source = {
      a: 1,
      'b.c': 3,
      'd.e.f': 4,
    };
    expect(unflattenObject(source)).toEqual({
      a: 1,
      b: { c: 3 },
      d: { e: { f: 4 } },
    });
  });

  it('merges defaults', () => {
    const source = {
      name: 'John',
      age: 30,
    };

    const defaults = {
      name: 'Jane',
      age: 25,
      language: 'en',
    };

    expect(mergeDefaults(source, defaults)).toEqual({
      name: 'John',
      age: 30,
      language: 'en',
    });
  });
});
