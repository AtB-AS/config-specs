import {assertType, expect, test} from 'vitest';
import {FeatureRules} from '../feature-rules';
import {readLocalFile} from '../utils/fs';
import {join} from 'path';

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
