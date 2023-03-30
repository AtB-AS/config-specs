import {assertType, expect, test} from 'vitest';
import {ZoneSelectionMode} from '..';

test('ZoneSelectionMode', function () {
  expect(() => ZoneSelectionMode.parse('foo')).toThrowError();
  expect(() => ZoneSelectionMode.parse('bar')).toThrowError();
  expect(() => ZoneSelectionMode.parse('none')).not.toThrowError();

  assertType<ZoneSelectionMode>(ZoneSelectionMode.parse('multiple-stop'));
  assertType<ZoneSelectionMode>(ZoneSelectionMode.parse('none'));
  assertType<ZoneSelectionMode>(ZoneSelectionMode.parse('multiple-zone'));
});
