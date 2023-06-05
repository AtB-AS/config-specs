import {assertType, expect, test} from 'vitest';
import {MobilityOperator, MobilityOperatorType} from '../mobility-operators';

test('MobilityOperator', () => {
  expect(() => MobilityOperator.parse('foo')).toThrowError();
  expect(() => MobilityOperator.parse({id: 'no name'})).toThrowError()
  expect(() => MobilityOperator.parse({name: 'no id'})).toThrowError()
  expect(() => MobilityOperator.parse({id: 'id', name: 'no formFactor'})).toThrowError()
  expect(MobilityOperator.parse({id: 'id', name: 'default showInApp',formFactors: ['SCOOTER']}).showInApp).toEqual(true);

  assertType<MobilityOperatorType>(
    MobilityOperator.parse({
      id: 'id',
      name: 'Some',
      formFactors: ["SCOOTER"],
      showInApp: true,
    }),
  );
})