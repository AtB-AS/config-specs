import zodToJsonSchema from 'zod-to-json-schema';
import {
  FareProductTypeConfig,
  FareProductTypeConfigSettings,
  LanguageAndTextType,
  TransportModeType,
} from '../types';

const jsonSchema = zodToJsonSchema(FareProductTypeConfig, {
  definitions: {
    LanguageAndTextType,
    TransportModeType,
    FareProductTypeConfigSettings,
  },
});
console.log(JSON.stringify(jsonSchema, null, 2));
