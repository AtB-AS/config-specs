import {assertType, expect, test} from 'vitest';
import {TransportModeType, TransportSubmodeType} from '../common';
import {ProductTypeTransportModes} from '../fare-product-type';

test('TransportModeType', function () {
  expect(() => ProductTypeTransportModes.parse('foo')).toThrowError();
  expect(() => ProductTypeTransportModes.parse('{}')).toThrowError();
  expect(() => ProductTypeTransportModes.parse('{ "foo": 1 }')).toThrowError();
  expect(() => ProductTypeTransportModes.parse({foo: 1})).toThrowError();

  const valid: ProductTypeTransportModes = {
    mode: 'air',
    subMode: 'airportLinkRail',
  };
  expect(() => ProductTypeTransportModes.parse(valid)).not.toThrowError();

  assertType<ProductTypeTransportModes>(ProductTypeTransportModes.parse(valid));
  assertType<ProductTypeTransportModes>(
    ProductTypeTransportModes.parse({
      mode: 'coach',
    }),
  );
});
