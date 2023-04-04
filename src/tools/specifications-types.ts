import {z} from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import {JsonSchema7Type} from 'zod-to-json-schema/src/parseDef';
import {
  LanguageAndTextType,
  LanguageAndTextTypeArray,
  TransportModeType,
  TransportModeTypeEnum,
  TransportSubmodeType,
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
