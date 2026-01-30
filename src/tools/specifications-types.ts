import {z} from 'zod';
import {FareProductGroup, FareProductTypeConfig} from '../fare-product-type';
import {TravelSearchFilters} from '../travel-search-filters';
import {
  BonusProduct,
  BonusTexts,
  MobilityOperator,
  OperatorBenefitId,
  BonusSource,
  ScooterConsentLine,
  ScooterFaq,
} from '../mobility';
import {
  ConfigurableLinksSchema,
  AppVersionedConfigurableLink,
  AppVersionedConfigurableLinkSchema,
  AppVersionedItem,
  AppVersionedItemSchema,
} from '../urls';
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

export {
  AppVersionedConfigurableLink,
  AppVersionedConfigurableLinkSchema,
  AppVersionedItem,
  AppVersionedItemSchema,
};

// Exactly as structured in Firestore Config Yaml Files (correct root level)
export const schemaTypes = {
  fareProductTypeConfigs: z
    .object({
      fareProductTypeConfigs: z.array(FareProductTypeConfig),
      fareProductGroups: z.array(FareProductGroup).optional(),
    })
    .meta({title: 'FareProductConfiguration'}),
  travelSearchFilters: TravelSearchFilters.meta({title: 'TravelSearchFilters'}),
  mobility: z
    .object({
      operators: z.array(MobilityOperator),
      scooterFaqs: z.array(ScooterFaq).optional(),
      scooterConsentLines: z.array(ScooterConsentLine).optional(),
      benefitIdsRequiringValueCode: z.array(OperatorBenefitId).optional(),
      bonusProducts: z.array(BonusProduct).optional(),
      bonusTexts: BonusTexts.optional(),
      bonusSources: z.array(BonusSource).optional(),
    })
    .meta({title: 'MobilityOperator'}),
  other: Other,
  paymentTypes: PaymentTypes,
  urls: ConfigurableLinksSchema.meta({title: 'ConfigurableLinks'}),
  harborConnectionOverrides: HarborConnectionOverrides,
  notificationConfig: NotificationConfig,
  consents: Consents,
  referenceData: ReferenceData,
  stopSignalButtonConfig: StopSignalButtonConfig,
} satisfies Record<SchemaNames, unknown>;

// All correctly supported schema types as JSON Schema data structures
export const jsonSchemas = Object.fromEntries(
  Object.entries(schemaTypes).map(([key, schema]) => {
    const json = z.toJSONSchema(schema, {io: 'input'}); // transforms can't be exported to json schemas. Handled by selecting the (input) type before transforming.
    return [key, json];
  }),
);
