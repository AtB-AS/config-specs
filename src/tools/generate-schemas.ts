import {writeFile} from 'fs/promises';
import {join} from 'path';
import {BASE_FOLDER} from './config';
import {SchemaNames, schemaTypes} from './specifications-types';

saveSchema('fareProductTypeConfigs');

function saveSchema(schema: SchemaNames) {
  const schemaType = schemaTypes[schema];
  if (schemaType) {
    save(schema, schemaType);
  }
}
function save(filename: string, content: object) {
  return writeFile(
    join(BASE_FOLDER, `${filename}.json`),
    JSON.stringify(content, null, 2),
  );
}
