import {assertType, expect, test} from 'vitest';
import {TransportMode, TransportModeType, TransportSubmode} from '..';

test('TransportModeType', function () {
  expect(() => TransportModeType.parse('foo')).toThrowError();
  expect(() => TransportModeType.parse('{}')).toThrowError();
  expect(() => TransportModeType.parse('{ "foo": 1 }')).toThrowError();
  expect(() => TransportModeType.parse({foo: 1})).toThrowError();

  const valid: TransportModeType = {
    mode: TransportMode.Air,
    subMode: TransportSubmode.AirportLinkRail,
  };
  expect(() => TransportModeType.parse(valid)).not.toThrowError();

  assertType<TransportModeType>(TransportModeType.parse(valid));
  assertType<TransportModeType>(
    TransportModeType.parse({
      mode: TransportMode.Coach,
    }),
  );
  assertType<TransportModeType>(
    TransportModeType.safeParse(`{
      "mode": "${TransportMode.Coach}"
    }`),
  );
});
