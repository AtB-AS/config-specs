import {assertType, expect, test} from 'vitest';
import {
  FeatureRules,
  FeatureRuleType,
  ZoneFeatureGeometryType,
  ZoneFeatureRule,
} from '../feature-rules';
import {readLocalFile} from '../utils/fs';
import {join} from 'path';
import turfBooleanPointInPolygon from '@turf/boolean-point-in-polygon';
import {z} from 'zod';

test('FeatureRules', async function () {
  expect(
    () => FeatureRules.parse('foo'),
    'FeatureRules must be an object',
  ).toThrowError();

  let fixture = await readFixture('fixtures/featureRules.json');
  assertType<FeatureRules>(FeatureRules.parse(fixture));

  const nonExistingInbuiltRule = {
    zoneFeatureRules: [
      {
        ruleName: 'isWithinMyOwnInbuiltRule',
        ruleDescription: {
          lang: 'nob',
          value: 'En regel som ikke eksisterer',
        },
        ruleType: 'Inbuilt',
        isEnabled: true,
        geometryType: 'Reference',
        referenceType: 'FareZone',
        zoneIds: ['ATB:FareZone:10', 'ATB:FareZone:6'],
      },
    ],
  };

  expect(
    () => FeatureRules.parse(nonExistingInbuiltRule),
    'Inbuilt rules not already defined in schema should throw an error',
  ).toThrowError();
});

async function readFixture(file: string) {
  return (await readLocalFile(join(__dirname, file))).contents;
}

test('FeatureRulesEvaluation', async function () {
  const fixture = await readFixture('fixtures/featureRules.json');
  const featureRules = FeatureRules.parse(fixture);
  const ruleVariables: RuleVariables = {
    location: [10.57160969381, 63.09006242709],
  };
  const appRules = featureRules.zoneFeatureRules
    .filter(
      (rule) => rule.geometryType === ZoneFeatureGeometryType.Values.Inline,
    )
    .map(mapFromZoneFeatureRules);
  const result = appRules.map((rule) => checkRule(rule, ruleVariables));
  expect(result).toEqual([true, true]);

  const ruleVariablesNotWithin: RuleVariables = {
    location: [20.57160969381, 63.09006242709],
  };
  const appRulesNotWithin = featureRules.zoneFeatureRules
    .filter(
      (rule) => rule.geometryType === ZoneFeatureGeometryType.Values.Inline,
    )
    .map(mapFromZoneFeatureRules);
  const resultNotWithin = appRulesNotWithin.map((rule) =>
    checkRule(rule, ruleVariablesNotWithin),
  );
  expect(resultNotWithin).toEqual([false, false]);
});

const mapFromZoneFeatureRules = (featureRule: ZoneFeatureRule): Rule => {
  if (featureRule.geometryType === ZoneFeatureGeometryType.Values.Inline) {
    return {
      variable: 'location',
      value: Polygon.parse(featureRule.geometry.coordinates),
      operator: RuleOperator.isWithinZones,
    };
  }
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

export type RuleVariables = {
  location: Coordinates;
  [key: string]: RuleValue | RuleValue[];
};

export enum RuleOperator {
  isWithinZones = 'isWithinZones',
}

export const Rule = z.object({
  variable: z.string().describe('key of RuleVariables'),
  operator: z.nativeEnum(RuleOperator),
  value: RuleValue,
  groupId: z.string().optional(),
});
export type Rule = z.infer<typeof Rule>;

const checkRule = (rule: Rule, localVariables: RuleVariables): boolean => {
  const {operator, value: ruleValue, variable: variableName} = rule;
  if (!(variableName in localVariables)) return false;
  const localValue = localVariables[variableName];
  switch (operator) {
    case RuleOperator.isWithinZones:
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
