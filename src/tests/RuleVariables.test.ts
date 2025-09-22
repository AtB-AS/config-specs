import {assertType, expect, test} from 'vitest';
import {
  RuleVariables,
  ZoneRuleVariable,
  ZoneRuleVariableType,
} from '../rule-variables';
import {readLocalFile} from '../utils/fs';
import {join} from 'path';
import turfBooleanPointInPolygon from '@turf/boolean-point-in-polygon';
import {z} from 'zod';

test('RuleVariables', async function () {
  expect(
    () => RuleVariables.parse('foo'),
    'RuleVariables must be an object',
  ).toThrowError();

  let fixture = await readFixture('fixtures/ruleVariables.json');
  assertType<RuleVariables>(RuleVariables.parse(fixture));

  const nonExistingInbuiltRule = {
    zoneRuleVariables: [
      {
        variableName: 'myOwnInbuiltRuleVariable',
        variableDescription: {
          lang: 'nob',
          value: 'En regel som ikke eksisterer',
        },
        variableType: 'Inbuilt',
        geometryType: 'Reference',
        referenceType: 'FareZone',
        referenceIds: ['ATB:FareZone:10', 'ATB:FareZone:6'],
      },
    ],
  };

  expect(
    () => RuleVariables.parse(nonExistingInbuiltRule),
    'Inbuilt rules not already defined in schema should throw an error',
  ).toThrowError();
});

async function readFixture(file: string) {
  return (await readLocalFile(join(__dirname, file))).contents;
}

test('RuleVariablesEvaluation', async function () {
  const fixture = await readFixture('fixtures/ruleVariables.json');
  const ruleVariables = RuleVariables.parse(fixture);
  const testLocation: Coordinates = [10.57160969381, 63.09006242709];

  // Test inline polygon zones - convert to rules for testing evaluation
  const inlineZoneVariables = ruleVariables
    .zoneRuleVariables!.filter(
      (variable) =>
        variable.geometryType === ZoneRuleVariableType.Values.Inline,
    )
    .map(mapFromZoneRuleVariables);
  const inlineResults = inlineZoneVariables.map((rule) =>
    checkRule(rule, {location: testLocation}),
  );
  expect(inlineResults).toEqual([true, true]); // Both inline polygon zones should contain the test location

  // Test location not within
  const testLocationOutside: Coordinates = [20.57160969381, 63.09006242709];
  const inlineResultsOutside = inlineZoneVariables.map((rule) =>
    checkRule(rule, {location: testLocationOutside}),
  );
  expect(inlineResultsOutside).toEqual([false, false]); // Location outside polygons
});

const mapFromZoneRuleVariables = (zoneVariable: ZoneRuleVariable): Rule => {
  if (zoneVariable.geometryType === ZoneRuleVariableType.Values.Inline) {
    return {
      variable: 'location',
      value: Polygon.parse(zoneVariable.geometry.coordinates),
      operator: RuleOperator.isUserWithinZone,
    };
  }

  // Faking a polygon for reference rules
  return {
    variable: 'location',
    value: [[[10.57160969381, 63.09006242709]]],
    operator: RuleOperator.isUserWithinZone,
  };
};

export const Coordinates = z.array(z.number()).length(2);
type Coordinates = z.infer<typeof Coordinates>;
export const Polygon = z.array(z.array(Coordinates));
type Polygon = z.infer<typeof Polygon>;
const RuleValue = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  Coordinates,
  Polygon,
]);
type RuleValue = z.infer<typeof RuleValue>;

export type TestRuleVariables = {
  location: Coordinates;
  [key: string]: RuleValue | RuleValue[];
};

export enum RuleOperator {
  isUserWithinZone = 'isUserWithinZone',
}

export const Rule = z.object({
  variable: z.string().describe('key of RuleVariables'),
  operator: z.nativeEnum(RuleOperator),
  value: RuleValue,
  groupId: z.string().optional(),
});
export type Rule = z.infer<typeof Rule>;

const checkRule = (rule: Rule, localVariables: TestRuleVariables): boolean => {
  const {operator, value: ruleValue, variable: variableName} = rule;
  if (!(variableName in localVariables)) return false;
  const localValue = localVariables[variableName];
  switch (operator) {
    case RuleOperator.isUserWithinZone:
      const [longitude, latitude] = localValue as Coordinates;
      const result = Polygon.safeParse(ruleValue);
      if (result.success)
        return turfBooleanPointInPolygon([longitude, latitude], {
          type: 'Polygon',
          coordinates: result.data,
        });
      return false;
    default:
      return false;
  }
};
