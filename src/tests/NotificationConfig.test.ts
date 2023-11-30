import {assertType, expect, test} from 'vitest';

import {
  NotificationConfig,
  NotificationConfigType,
  NotificationGroup,
  NotificationGroupType,
  NotificationMode,
  NotificationModeType,
} from '../notification-config';

test('NotificationConfig', () => {
  expect(
    () => NotificationConfig.parse('foo'),
    'NotificationConfig must be an object',
  ).toThrowError();
  expect(
    () => NotificationConfig.parse({}),
    'NotificationConfig must have groups',
  ).toThrowError();
  expect(
    () => NotificationConfig.parse({groups: []}),
    'NotificationConfig must have modes',
  ).toThrowError();

  assertType<NotificationConfigType>({
    groups: [],
    modes: [],
  });
});

test('NotificationGroup', () => {
  expect(
    () => NotificationGroup.parse('foo'),
    'NotificationGroup must be an object',
  ).toThrowError();
  expect(
    () => NotificationGroup.parse({}),
    'NotificationGroup must have id',
  ).toThrowError();
  expect(
    () => NotificationGroup.parse({id: 'foo'}),
    'NotificationGroup must have enabled',
  ).toThrowError();
  expect(
    () => NotificationGroup.parse({id: 'foo', enabled: true}),
    'NotificationGroup must have salesPackages',
  ).toThrowError();
  expect(
    () =>
      NotificationGroup.parse({
        id: 'foo',
        enabled: true,
        salesPackages: [],
        toggleDescription: [],
      }),
    'NotificationGroup must have toggleTitle',
  ).toThrowError();
  expect(
    () =>
      NotificationGroup.parse({id: 'foo', enabled: true, salesPackages: []}),
    'NotificationGroup must have toggleDescription',
  ).toThrowError();

  assertType<NotificationGroupType>({
    id: 'foo',
    enabled: true,
    salesPackages: [],
    toggleDescription: [],
    toggleTitle: [],
  });
});

test('NotificationMode', () => {
  expect(
    () => NotificationMode.parse('foo'),
    'NotificationMode must be an object',
  ).toThrowError();
  expect(
    () => NotificationMode.parse({}),
    'NotificationMode must have id',
  ).toThrowError();
  expect(
    () => NotificationMode.parse({id: 'foo'}),
    'NotificationMode must have enabled',
  ).toThrowError();

  assertType<NotificationModeType>({
    id: 'foo',
    enabled: true,
  });
});
