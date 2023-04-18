import {assertType, expect, test} from 'vitest';
import {TransportModeFilterOptionType} from '../travel-search-filters';

test('TransportModeFilterOptionType', function () {
  expect(() => TransportModeFilterOptionType.parse('foo')).toThrowError();

  assertType<TransportModeFilterOptionType>(
    TransportModeFilterOptionType.parse({
      id: 'id',
      icon: {transportMode: 'bus'},
      text: [
        {
          lang: 'nob',
          value: 'foo',
        },
      ],
      modes: [],
    }),
  );
});
