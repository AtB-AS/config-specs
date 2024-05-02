import {assertType, expect, test} from 'vitest';
import {
  TravelSearchPreference,
  TravelSearchPreferenceType,
} from '../travel-search-filters';

test('TravelSearchPreference', function () {
  expect(() => TravelSearchPreference.parse('foo')).toThrowError();

  assertType<TravelSearchPreferenceType>(
    TravelSearchPreference.parse({
      type: 'walkSpeed',
      title: [
        {
          lang: 'nob',
          value: 'Overskrift',
        },
      ],
      options: [
        {
          id: 'walkSpeed-slow',
          text: {
            lang: 'nob',
            value: 'Langsom',
          },
          value: 1,
        },
        {
          id: 'walkSpeed-normal',
          text: {
            lang: 'nob',
            value: 'Normal',
          },
          value: 2.5,
        },
      ],
      defaultOption: 'walkSpeed-normal',
    }),
  );
});
