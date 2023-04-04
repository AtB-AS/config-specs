import {z} from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import {JsonSchema7Type} from 'zod-to-json-schema/src/parseDef';
import {
  LanguageAndTextType,
  LanguageAndTextTypeArray,
  TransportModeTypeEnum,
  TransportSubmodeTypeEnum,
} from '../common';
import {
  FareProductTypeConfig,
  FareProductTypeConfigSettings,
  ProductTypeTransportModes,
} from '../fare-product-type';
import {
  TravelSearchFiltersType,
  TravelSearchTransportModeIcon,
  TravelSearchTransportModes,
} from '../travel-search-filters';

// All supported specifications
export const specifications = [
  'fareProductTypeConfigs',
  'other',
  'paymentTypes',
  'travelSearchFilters',
  'url',
] as const;

export type SchemaNames = typeof specifications[number];

// Exactly as structured in Firestore Config Yaml Files (correct root level)
export const schemaTypes = {
  fareProductTypeConfigs: z.object({
    fareProductTypeConfigs: z.array(FareProductTypeConfig),
  }),
  travelSearchFilters: TravelSearchFiltersType,
  other: undefined,
  paymentTypes: undefined,
  url: undefined,
};

// All correctly supportet schema types as JSON Schema data structures
export const jsonSchemas = {
  fareProductTypeConfigs: zodToJsonSchema(
    z.object({
      fareProductTypeConfigs: z.array(FareProductTypeConfig),
    }),
    {
      name: 'FareProductConfiguration',
      definitions: {
        LanguageAndTextType,
        ProductTypeTransportModes,
        FareProductTypeConfigSettings,
        FareProductTypeConfig,
        TransportModeTypeEnum,
        TransportSubmodeTypeEnum,
      },
    },
  ),
  other: undefined,
  paymentTypes: undefined,
  travelSearchFilters: zodToJsonSchema(TravelSearchFiltersType, {
    name: 'TravelSearchFilters',
    definitions: {
      LanguageAndTextTypeArray,
      TravelSearchTransportModes,
      TravelSearchTransportModeIcon,
      TransportModeTypeEnum,
      TransportSubmodeTypeEnum,
    },
  }),
  url: undefined,
} satisfies Record<SchemaNames, JsonSchema7Type | undefined>;
