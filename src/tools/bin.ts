#!/usr/bin/env node

import {readFile} from 'fs/promises';
import {extname, resolve} from 'path';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {specifications} from './specifications-types';
import validate from './validate';
import yaml from 'js-yaml';
import {glob, hasMagic} from 'glob';

main();

async function main() {
  const opts = await yargs(hideBin(process.argv))
    .usage('Usage: $0 -s [schema] -f [file]')
    .example(
      '$0 -s other -f other.json',
      'Validate other.json with position specification',
    )
    .example(
      '$0 -s other -f other.yaml',
      'Validate other.yaml with position specification',
    )
    .option('file', {
      alias: 'f',
      describe: 'file to validate',
    })
    .option('schema', {
      alias: 's',
      describe: 'choose a schema',
      choices: specifications,
    })
    .demandOption(
      ['file', 'schema'],
      'Please provide both scheme and file arguments',
    )
    .help('h')
    .alias('h', 'help')
    .coerce('file', readAllFiles)
    .parse();

  let error = 0;
  if (!opts?.file) {
    console.log('No files to validate');
    return;
  }

  console.log(
    `Validating files: ${(await opts.file).map((i) => i.filename).join(', ')}`,
  );
  for (let file of await opts.file) {
    const validationData = await validate(opts.schema, file.contents);

    if (!validationData.error) {
      console.log('');
      console.log(`✅ Valid document: ${file.filename}`);
    } else {
      console.log('');
      console.log(`❌ Error for file ${file.filename}:`);
      validationData.errorData
        ?.map((error) => `   ${error.instancePath} ${error.message}`)
        .forEach((l) => console.log(l));

      error = 1;
    }
  }
  console.log('');
  process.exit(error);
}

async function readAllFiles(fileOrGlob: string | string[]) {
  const read = async (file: string) => {
    if (hasMagic(file)) {
      const files = await glob(file, {cwd: process.cwd()});
      return Promise.all(files.map(readLocalFile));
    } else {
      return [await readLocalFile(resolve(process.cwd(), file))];
    }
  };
  if (Array.isArray(fileOrGlob)) {
    return (await Promise.all(fileOrGlob.map(read))).flat();
  } else {
    return read(fileOrGlob);
  }
}

async function readLocalFile(filename: string) {
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
