import Ajv from 'ajv';
import type {ValidateFunction} from 'ajv/dist/core';
import {readFile} from 'fs/promises';
import {join} from 'path';

import addFormats from 'ajv-formats';
import {SchemaNames} from './specifications-types';
import {BASE_FOLDER} from './config';

let ajv = new Ajv({allErrors: true});
ajv = addFormats(ajv);

type ValidationOutput =
  | {error: false}
  | {
      error: true;
      errorData: ValidateFunction['errors'];
    };
export default async function validate(
  schema: SchemaNames,
  json: object,
): Promise<ValidationOutput> {
  await potentiallyAddCommon();

  const doValidate = await readSpecification(schema);
  const isValid = doValidate(json);
  if (isValid) {
    return {error: false};
  } else {
    return {
      error: true,
      errorData: doValidate.errors,
    };
  }
}

async function readSpecification(
  filename: SchemaNames,
): Promise<ValidateFunction> {
  const spec = await readFile(join(BASE_FOLDER, `${filename}.json`));
  try {
    const parsed = JSON.parse(spec.toString());
    const previous = ajv.getSchema(parsed['$id']);

    if (previous) {
      return previous;
    } else {
      return ajv.compile(parsed);
    }
  } catch (err) {
    throw new Error(`Unable to load or parse ${err}`);
  }
}

async function potentiallyAddCommon() {
  const spec = await readFile(join(BASE_FOLDER, `_common.json`));
  try {
    const parsed = JSON.parse(spec.toString());
    const previous = ajv.getSchema(parsed['$id']);

    if (!previous) {
      ajv.addSchema(parsed);
    }
  } catch (err) {
    throw new Error(`Unable to load common refs`);
  }
}
