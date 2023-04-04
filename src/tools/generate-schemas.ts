import {writeFile} from 'fs/promises';
import {join} from 'path';
import {BASE_FOLDER} from './config';
import {SchemaNames, jsonSchemas, specifications} from './specifications-types';

saveAll();

async function saveAll() {
  await Promise.all(specifications.map(saveSchema));
}

async function saveSchema(schema: SchemaNames) {
  const schemaType = jsonSchemas[schema];

  try {
    if (schemaType) {
      await save(schema, schemaType);
      console.log(`Generating ${schema}`);
    } else {
      console.log(`> Ignoring ${schema}. Missing implementation`);
    }
  } catch (e) {
    console.error(`Error generationg ${schema}`, e);
    process.exit(1);
  }
}
function save(filename: string, content: object) {
  return writeFile(
    join(BASE_FOLDER, `${filename}.json`),
    JSON.stringify(content, null, 2),
  );
}
