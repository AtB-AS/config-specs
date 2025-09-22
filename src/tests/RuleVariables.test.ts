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
  const localVariables = ruleVariables.zoneRuleVariables!.reduce(
    (acc, variable) => {
      if (variable.geometryType === ZoneRuleVariableType.Values.Inline) {
        acc[variable.variableName] = variable.geometry.coordinates;
      } else {
        // Faking a polygon for reference rules
        acc[variable.variableName] = [
          [
            [10.57160969381, 63.09006242709],
            [10.67250886502, 63.12453638347],
            [10.71494714304, 63.14391001657],
            [10.77790349969, 63.12242873209],
            [10.9029210181, 63.08257285441],
            [10.44386181609, 63.08624035226],
            [10.48673313777, 63.09094437303],
            [10.52419141378, 63.09172830252],
            [10.57160969381, 63.09006242709],
          ],
        ];
      }
      return acc;
    },
    {} as TestRuleVariables,
  );

  const rules = ruleVariables.zoneRuleVariables!.map((rv) => {
    return {
      variable: rv.variableName,
      value: true,
      operator: RuleOperator.isUserWithinZone,
    };
  });

  const results = rules.map((rule) =>
    checkRule(rule, {userLocation: testLocation, ...localVariables}),
  );
  expect(results).toEqual([true, true, true, true]); // Both inline polygon zones should contain the test location

  // Test location not within
  const testLocationOutside: Coordinates = [20.57160969381, 63.09006242709];
  const resultsOutside = rules.map((rule) =>
    checkRule(rule, {userLocation: testLocationOutside, ...localVariables}),
  );
  expect(resultsOutside).toEqual([false, false, false, false]); // Location outside polygons
});

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
  userLocation: Coordinates;
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
      const [longitude, latitude] = localVariables.userLocation;
      const result = Polygon.safeParse(localValue);
      if (result.success)
        return (
          turfBooleanPointInPolygon([longitude, latitude], {
            type: 'Polygon',
            coordinates: result.data,
          }) == ruleValue
        );
      return false;
    default:
      return false;
  }
};
