import toOptionName from '../src/toOptionName';
import { bracketNameGenerator, dotNotationNameGenerator } from '../src/nameGenerators';
import { Registry } from '../src/types';

describe('toOptionName()', () => {
  const mockRegistry = (nameGenerator?: any): Registry => ({
    globalFormOptions: {
      idPrefix: 'root',
      idSeparator: '_',
      nameGenerator,
    },
    fields: {},
    templates: {} as any,
    widgets: {},
    formContext: {},
    rootSchema: {},
    schemaUtils: {} as any,
    translateString: (str: string) => str,
  });

  describe('without nameGenerator', () => {
    const registry = mockRegistry();

    test('returns htmlName when provided', () => {
      expect(toOptionName('root_hobbies', 'root[hobbies]', registry, 0)).toBe('root[hobbies]');
    });

    test('returns id when htmlName is undefined', () => {
      expect(toOptionName('root_hobbies_0', undefined, registry, 0)).toBe('root_hobbies_0');
    });

    test('returns htmlName over id when both provided', () => {
      expect(toOptionName('root_hobbies_0', 'root[hobbies]', registry, 0)).toBe('root[hobbies]');
    });
  });

  describe('with bracketNameGenerator', () => {
    const registry = mockRegistry(bracketNameGenerator);

    test('appends [0] to htmlName for first option', () => {
      expect(toOptionName('root_hobbies', 'root[hobbies]', registry, 0)).toBe('root[hobbies][0]');
    });

    test('appends [1] to htmlName for second option', () => {
      expect(toOptionName('root_hobbies', 'root[hobbies]', registry, 1)).toBe('root[hobbies][1]');
    });

    test('appends [2] to htmlName for third option', () => {
      expect(toOptionName('root_hobbies', 'root[hobbies]', registry, 2)).toBe('root[hobbies][2]');
    });

    test('returns id when htmlName is undefined', () => {
      expect(toOptionName('root_hobbies_0', undefined, registry, 0)).toBe('root_hobbies_0');
    });
  });

  describe('with dotNotationNameGenerator', () => {
    const registry = mockRegistry(dotNotationNameGenerator);

    test('appends .0 to htmlName for first option', () => {
      expect(toOptionName('root_hobbies', 'root.hobbies', registry, 0)).toBe('root.hobbies.0');
    });

    test('appends .1 to htmlName for second option', () => {
      expect(toOptionName('root_hobbies', 'root.hobbies', registry, 1)).toBe('root.hobbies.1');
    });

    test('appends .2 to htmlName for third option', () => {
      expect(toOptionName('root_hobbies', 'root.hobbies', registry, 2)).toBe('root.hobbies.2');
    });

    test('returns id when htmlName is undefined', () => {
      expect(toOptionName('root_hobbies_0', undefined, registry, 0)).toBe('root_hobbies_0');
    });
  });

  describe('with custom nameGenerator', () => {
    const customNameGenerator = (path: (string | number)[], idPrefix: string) => {
      if (path.length === 0) {
        return idPrefix;
      }
      return `${idPrefix}__${path.join('__')}`;
    };

    const registry = mockRegistry(customNameGenerator);

    test('uses custom nameGenerator to append index', () => {
      expect(toOptionName('root_hobbies', 'root__hobbies', registry, 0)).toBe('root__hobbies__0');
    });

    test('uses custom nameGenerator with different index', () => {
      expect(toOptionName('root_hobbies', 'root__hobbies', registry, 5)).toBe('root__hobbies__5');
    });
  });
});
