import {assertType, expect, test} from 'vitest';
import {FlexibleTransportOptionType} from '../travel-search-filters';

test('TransportModeFilterOptionType', function () {
  expect(() => FlexibleTransportOptionType.parse('foo')).toThrowError();

  assertType<FlexibleTransportOptionType>(
    FlexibleTransportOptionType.parse({
      id: 'id',
      title: [
        {
          lang: 'nob',
          value: 'foo',
        },
      ],
      isNew: true,
      description: [
        {
          lang: 'nob',
          value: 'foo',
        },
      ],
    }),
  );
});
