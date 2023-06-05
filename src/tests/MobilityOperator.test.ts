import {assertType, expect, test} from 'vitest';
import {MobilityOperator, MobilityOperatorType} from '../mobility-operators';

test('MobilityOperator', () => {
  expect(() => MobilityOperator.parse('foo'), 'Config must be an object').toThrowError();
  expect(() => MobilityOperator.parse({id: 'foo'}), 'Name is required').toThrowError()
  expect(() => MobilityOperator.parse({name: 'foo'}), 'Id is required').toThrowError()
  expect(() => MobilityOperator.parse({id: 'id', name: 'foo'}), 'FormFactor is required').toThrowError()
  expect(() => MobilityOperator.parse({id: 'id', name: 'foo', formFactors: []}), 'FormFactors must have at least one value').toThrowError()
  expect(MobilityOperator.parse({id: 'id', name: 'default showInApp',formFactors: ['SCOOTER']}).showInApp, 'showInApp should default to true').toEqual(true);

  assertType<MobilityOperatorType>(
    MobilityOperator.parse({
      id: 'id',
      name: 'Some',
      formFactors: ["SCOOTER"],
      showInApp: true,
    }),
  );
})