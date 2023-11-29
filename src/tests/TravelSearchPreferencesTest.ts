import {assertType, expect, test} from 'vitest';
import {TravelSearchPreferences, TravelSearchPreferencesType} from '../travel-search-filters';

test('TravelSearchPreferences', function () {
  expect(() => TravelSearchPreferences.parse('foo')).toThrowError();

  assertType<TravelSearchPreferencesType>(
    TravelSearchPreferences.parse({
      transferSlackOptions: [
        {
          title: {
            lang: 'nob',
            value: '1 min',
          },
          value: 1
        },
        {
          title: {
            lang: 'nob',
            value: '5 min',
          },
          value: 5
        }
      ],
      walkSpeedOptions: [
        {
          title: {
            lang: 'nob',
            value: 'Langsom',
          },
          value: 1
        },
        {
          title: {
            lang: 'nob',
            value: 'Normal',
          },
          value: 2.5
        }
      ]
    },
  ));
});
