import {assertType, expect, test} from 'vitest';
import {RuleVariables, ZoneRuleVariableGeometryType} from '../rule-variables';
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

  const nonExistingInbuiltZone = {
    zoneRuleVariables: [
      {
        variableName: 'myOwnInbuiltZoneVariable',
        variableDescription: {
          lang: 'nob',
          value:
            'Noen prøver å lage en egen inbuilt sone som ikke er definert i schema',
        },
        variableType: 'Inbuilt',
        geometryType: 'Reference',
        referenceType: 'FareZone',
        referenceIds: ['ATB:FareZone:10', 'ATB:FareZone:6'],
      },
    ],
  };

  expect(
    () => RuleVariables.parse(nonExistingInbuiltZone),
    'Inbuilt variable zone not already defined in schema should throw an error',
  ).toThrowError();
});

async function readFixture(file: string) {
  return (await readLocalFile(join(__dirname, file))).contents;
}

test('RuleVariablesEvaluation', async function () {
  const fixture = await readFixture('fixtures/ruleVariables.json');
  const ruleVariables = RuleVariables.parse(fixture);

  // Create local variables for testing evaluation based on fixture data
  const localVariables = ruleVariables.zoneRuleVariables!.reduce(
    (acc, variable) => {
      if (
        variable.geometryType === ZoneRuleVariableGeometryType.Values.Inline
      ) {
        acc[variable.variableName] = variable.geometry.coordinates;
      } else {
        // Faking a polygon for reference zones, in app code this will be replaced with the actual polygon from the reference data
        // based on its referenceType (FareZone or CityZone) and referenceIds (e.g. ATB:FareZone:10, ATB:FareZone:6, steinkjer, verdal etc)
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

  // Test positive case for where user location is within the zone
  const rulesPositiveInside = ruleVariables.zoneRuleVariables!.map((rv) => {
    return {
      variable: rv.variableName,
      value: true,
      operator: RuleOperator.isUserWithinZone,
    };
  });

  const testLocationInsideZones: Coordinates = [10.57160969381, 63.09006242709];

  const resultsPositiveInside = rulesPositiveInside.map((rule) =>
    checkRule(rule, {...localVariables, userLocation: testLocationInsideZones}),
  );
  expect(resultsPositiveInside).toEqual([true, true, true, true]); // Rules evaluated as true if user location is within the zone

  // Test positive case for where user location is not within the zone
  const testLocationOutsideZones: Coordinates = [
    20.57160969381, 63.09006242709,
  ];

  const rulesPositiveOutside = ruleVariables.zoneRuleVariables!.map((rv) => {
    return {
      variable: rv.variableName,
      value: false,
      operator: RuleOperator.isUserWithinZone,
    };
  });
  const resultsPositiveOutside = rulesPositiveOutside.map((rule) =>
    checkRule(rule, {
      ...localVariables,
      userLocation: testLocationOutsideZones,
    }),
  );
  expect(resultsPositiveOutside).toEqual([true, true, true, true]); // Rules evaluated as true if user location is outside the zone

  // Test negative case for where user location is not within the zone
  const resultsOutside = rulesPositiveInside.map((rule) =>
    checkRule(rule, {
      ...localVariables,
      userLocation: testLocationOutsideZones,
    }),
  );
  expect(resultsOutside).toEqual([false, false, false, false]); // Rules evaluated as false if user location is outside the zone
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
