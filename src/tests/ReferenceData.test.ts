import {assertType, expect, test} from 'vitest';
import {ReferenceData} from '../reference-data';
import {readLocalFile} from '../utils/fs';
import {join} from 'path';

test('ReferenceData', async function () {
  expect(() => ReferenceData.parse('foo')).toThrowError();
  expect(() => ReferenceData.parse({})).toThrowError();

  let fixture = await readFixture('fixtures/referenceData.json');
  assertType<ReferenceData>(ReferenceData.parse(fixture));
});

async function readFixture(file: string) {
  return (await readLocalFile(join(__dirname, file))).contents;
}
