import {z} from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import {JsonSchema7Type} from 'zod-to-json-schema/src/parseDef';
import {
  FareProductTypeConfig,
  FareProductTypeConfigSettings,
  LanguageAndTextType,
  TransportModeType,
} from '../fare-product-type';

export const specifications = [
  'fareProductTypeConfigs',
  'other',
  'paymentTypes',
  'travelSearchFilters',
  'url',
] as const;

export type SchemaNames = typeof specifications[number];

export const schemaTypes = {
  fareProductTypeConfigs: zodToJsonSchema(
    z.object({
      fareProductTypeConfigs: z.array(FareProductTypeConfig),
    }),
    {
      name: 'FareProductConfiguration',
      definitions: {
        LanguageAndTextType,
        TransportModeType,
        FareProductTypeConfigSettings,
        FareProductTypeConfig,
      },
    },
  ),
  other: undefined,
  paymentTypes: undefined,
  travelSearchFilters: undefined,
  url: undefined,
} satisfies Record<SchemaNames, JsonSchema7Type | undefined>;
