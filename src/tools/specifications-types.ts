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
  FareProductGroup,
  FareProductTypeConfig,
  FareProductTypeConfigSettings,
  ProductTypeTransportModes,
} from '../fare-product-type';
import {
  TravelSearchFilters,
  TravelSearchTransportModeIcon,
  TravelSearchTransportModes,
} from '../travel-search-filters';
import {
  FormFactor,
  MobilityOperator,
  OperatorBenefitId,
} from '../mobility-operators';
import {ConfigurableLinks} from '../urls';
import {HarborConnectionOverrides} from '../harbor-connection-overrides';
import {NotificationConfig} from '../notification-config';
import {Consents} from '../consents';
import {PaymentTypes} from '../payment-types';
import {Other} from '../other';
import {ReferenceData} from '../reference-data';
import {StopSignalButtonConfig} from '../stop-signal-button-config';

// All supported specifications
export const specifications = [
  'fareProductTypeConfigs',
  'other',
  'mobility',
  'paymentTypes',
  'travelSearchFilters',
  'urls',
  'harborConnectionOverrides',
  'notificationConfig',
  'consents',
  'referenceData',
  'stopSignalButtonConfig',
] as const;

export type SchemaNames = (typeof specifications)[number];

export function isValidSchema(schema: any): schema is SchemaNames {
  return schema in schemaTypes;
}

// Exactly as structured in Firestore Config Yaml Files (correct root level)
export const schemaTypes = {
  fareProductTypeConfigs: z.object({
    fareProductTypeConfigs: z.array(FareProductTypeConfig),
    fareProductGroups: z.array(FareProductGroup).optional(),
  }),
  travelSearchFilters: TravelSearchFilters,
  mobility: z.object({
    operators: z.array(MobilityOperator),
  }),
  other: Other,
  paymentTypes: PaymentTypes,
  urls: ConfigurableLinks,
  harborConnectionOverrides: HarborConnectionOverrides,
  notificationConfig: NotificationConfig,
  consents: Consents,
  referenceData: ReferenceData,
  stopSignalButtonConfig: StopSignalButtonConfig,
};

// All correctly supported schema types as JSON Schema data structures
export const jsonSchemas = {
  fareProductTypeConfigs: zodToJsonSchema(
    z.object({
      fareProductTypeConfigs: z.array(FareProductTypeConfig),
      fareProductGroups: z.array(FareProductGroup).optional(),
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
      benefitIdsRequiringValueCode: z.array(OperatorBenefitId).optional(),
    }),
    {
      name: 'MobilityOperator',
      definitions: {
        FormFactor,
        OperatorBenefitId,
      },
    },
  ),
  other: zodToJsonSchema(Other),
  paymentTypes: zodToJsonSchema(PaymentTypes),
  travelSearchFilters: zodToJsonSchema(TravelSearchFilters, {
    name: 'TravelSearchFilters',
    definitions: {
      LanguageAndTextTypeArray,
      TravelSearchTransportModes,
      TravelSearchTransportModeIcon,
      TransportModeType,
      TransportSubmodeType,
    },
  }),
  urls: zodToJsonSchema(ConfigurableLinks, {
    name: 'ConfigurableLinks',
    definitions: {
      LanguageAndTextType,
    },
  }),
  harborConnectionOverrides: zodToJsonSchema(HarborConnectionOverrides),
  notificationConfig: zodToJsonSchema(NotificationConfig),
  consents: zodToJsonSchema(Consents),
  referenceData: zodToJsonSchema(ReferenceData),
  stopSignalButtonConfig: zodToJsonSchema(StopSignalButtonConfig)
} satisfies Record<SchemaNames, JsonSchema7Type | undefined>;
