import {assertType, expect, test} from 'vitest';

import {Other} from '../other';

test('Phone number', () => {
  expect(
    () =>
      Other.parse({
        contactPhoneNumber: 'foo',
        vatPercent: 0,
      }),
    'Phone number must be valid',
  ).toThrowError();

  expect(
    () =>
      Other.parse({
        vatPercent: 1,
        contactPhoneNumber: '+12345678901234567890',
      }),
    'Phone must be at most 17 digits',
  ).toThrowError();

  expect(
    () =>
      Other.parse({
        vatPercent: 1,
        contactPhoneNumber: '+4712345678',
      }),
    'Phone must be at least +(3 digits)',
  ).not.toThrowError();
});
