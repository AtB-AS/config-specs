import {readFile} from 'fs/promises';
import yaml from 'js-yaml';
import {extname} from 'path';

export async function readLocalFile(filename: string) {
  const spec = await readFile(filename, 'utf8');
  try {
    return {
      contents: await decode(spec.toString(), ext(filename)),
      filename,
    };
  } catch (err) {
    console.error(`error: ${err}`);
    process.exit(2);
  }
}

function ext(filename: string): string {
  return extname(filename).substring(1).toLowerCase();
}
function decode(data: string, format: string): any {
  switch (format) {
    case 'yml':
    case 'yaml':
      return yaml.load(data, {
        schema: yaml.CORE_SCHEMA,
      });
    case 'json':
      return JSON.parse(data);
  }
  throw new Error(`Does not suppor file of type ${format}`);
}
