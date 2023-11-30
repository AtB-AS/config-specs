import {assertType, expect, test} from 'vitest';
import {FlexibleTransportOption, FlexibleTransportOptionType} from '../travel-search-filters';

test('TransportModeFilterOptionType', function () {
  expect(() => FlexibleTransportOption.parse('foo')).toThrowError();

  assertType<FlexibleTransportOptionType>(
    FlexibleTransportOption.parse({
      id: 'id',
      title: [
        {
          lang: 'nob',
          value: 'foo',
        },
      ],
      label: 'new',
      description: [
        {
          lang: 'nob',
          value: 'foo',
        },
      ],
    }),
  );
});
