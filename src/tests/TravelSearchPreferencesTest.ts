import {assertType, expect, test} from 'vitest';
import {TravelSearchPreference} from '../travel-search-filters';

test('TravelSearchPreference', function () {
  expect(() => TravelSearchPreference.parse('foo')).toThrowError();

  assertType<TravelSearchPreference>(
    TravelSearchPreference.parse({
      type: 'walkSpeed',
      title: [{
        lang: 'nob',
        value: 'Overskrift'
      }],
      options: [
        {
          id: 'walkSpeed-slow',
          text: {
            lang: 'nob',
            value: 'Langsom',
          },
          value: 1
        },
        {
          id: 'walkSpeed-normal',
          text: {
            lang: 'nob',
            value: 'Normal',
          },
          value: 2.5,
        }
      ],
      defaultOption: 'walkSpeed-normal',
    },
  ));
});
