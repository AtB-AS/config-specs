import {assertType, expect, test} from 'vitest';
import {
  TransportModeFilterOption,
  TransportModeFilterOptionType,
} from '../travel-search-filters';

test('TransportModeFilterOptionType', function () {
  expect(() => TransportModeFilterOption.parse('foo')).toThrowError();

  assertType<TransportModeFilterOptionType>(
    TransportModeFilterOption.parse({
      id: 'id',
      icon: {transportMode: 'bus'},
      text: [
        {
          lang: 'nob',
          value: 'foo',
        },
      ],
      modes: [],
      selectedAsDefault: true,
    }),
  );
});
