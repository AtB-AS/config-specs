import {join} from 'path';
import {describe, expect, test} from 'vitest';
import {isValidSchema, schemaTypes} from '../../tools/specifications-types';
import {readLocalFile} from '../../utils/fs';

/***
 * #### NOTE ######################################################################
 * These tests should never fail unless it is very intentional. These
 * are ment to ensure backwards compatibility with older apps.
 *
 * If they fail you need to ensure that the change is intentional
 * and that older apps refering to the data that is the cause
 * of change is no longer in use.
 * ################################################################################
 */

describe('Contract tests', () => {
  test.each`
    schema                      | fixture
    ${'fareProductTypeConfigs'} | ${'fareProductTypeConfigs.yaml'}
    ${'travelSearchFilters'}    | ${'travelSearchFilters.yaml'}
  `(
    'contract (schema: $schema) should not parse error',
    async ({schema, fixture}) => {
      const data = await fixtureAsJson(fixture);
      const valid = getValidation(schema)?.safeParse(data.contents);

      if (valid?.success) {
        expect(valid?.success).toBeTruthy();
      } else {
        expect(valid?.error.format()).toEqual({});
      }
    },
  );
});

function getValidation(schema: string) {
  if (!isValidSchema(schema)) {
    throw new Error(`Not able to find schema ${schema}`);
  }
  return schemaTypes[schema];
}
async function fixtureAsJson(file: string) {
  return readLocalFile(join(__dirname, file));
}
