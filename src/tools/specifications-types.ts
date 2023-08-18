import {z} from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import {JsonSchema7Type} from 'zod-to-json-schema/src/parseDef';
import {
  LanguageAndTextType,
  LanguageAndTextTypeArray,
  TransportModeType,
  TransportSubmodeType,
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
import {MobilityOperator, FormFactor} from '../mobility-operators';
import {ConfigurableLinks} from '../urls';
import {HarborConnectionOverride} from '../harbor-connection-overrides';

// All supported specifications
export const specifications = [
  'fareProductTypeConfigs',
  'other',
  'mobility',
  'paymentTypes',
  'travelSearchFilters',
  'url',
  'harborConnectionOverrides',
] as const;

export type SchemaNames = (typeof specifications)[number];

export function isValidSchema(schema: any): schema is SchemaNames {
  return schema in schemaTypes;
}

// Exactly as structured in Firestore Config Yaml Files (correct root level)
export const schemaTypes = {
  fareProductTypeConfigs: z.object({
    fareProductTypeConfigs: z.array(FareProductTypeConfig),
  }),
  travelSearchFilters: TravelSearchFiltersType,
  mobility: z.object({
    operators: z.array(MobilityOperator),
  }),
  other: undefined,
  paymentTypes: undefined,
  url: ConfigurableLinks,
  harborConnectionOverrides: z.array(HarborConnectionOverride),
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
        TransportModeType,
        TransportSubmodeType,
      },
    },
  ),
  mobility: zodToJsonSchema(
    z.object({
      operators: z.array(MobilityOperator),
    }),
    {
      name: 'MobilityOperator',
      definitions: {
        FormFactor,
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
      TransportModeType,
      TransportSubmodeType,
    },
  }),
  url: zodToJsonSchema(ConfigurableLinks, {
    name: 'ConfigurableLinks',
    definitions: {
      LanguageAndTextType,
    },
  }),
  harborConnectionOverrides: zodToJsonSchema(HarborConnectionOverride),
} satisfies Record<SchemaNames, JsonSchema7Type | undefined>;
