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
  fareProductTypeConfigs: z.toJSONSchema(
    z
      .object({
        fareProductTypeConfigs: z.array(FareProductTypeConfig),
        fareProductGroups: z.array(FareProductGroup).optional(),
      })
      .meta({title: 'FareProductConfiguration'}),
  ),

  mobility: z.toJSONSchema(
    z
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
  ),

  other: z.toJSONSchema(Other),
  paymentTypes: z.toJSONSchema(PaymentTypes),

  travelSearchFilters: z.toJSONSchema(
    TravelSearchFilters.meta({title: 'TravelSearchFilters'}),
  ),

  urls: z.toJSONSchema(ConfigurableLinks.meta({title: 'ConfigurableLinks'})),

  harborConnectionOverrides: z.toJSONSchema(HarborConnectionOverrides),
  notificationConfig: z.toJSONSchema(NotificationConfig),
  consents: z.toJSONSchema(Consents),
  referenceData: z.toJSONSchema(ReferenceData, {io: 'input'}), // transforms can't be exported to json schemas. Handled by selecting the (input) type before transforming.
  stopSignalButtonConfig: z.toJSONSchema(StopSignalButtonConfig),
} satisfies Record<SchemaNames, unknown>;
