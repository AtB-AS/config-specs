import {assertType, expect, test} from 'vitest';
import {LanguageAndTextTypeArray} from '../common';
import {TravelSearchTransport} from '../travel-search-filters';

test('TravelSearchTransport', function () {
  expect(() => TravelSearchTransport.parse('foo')).toThrowError();

  assertType<TravelSearchTransport>(
    TravelSearchTransport.parse({
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
