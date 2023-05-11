import {z} from 'zod';
import {
  LanguageAndTextTypeArray,
  TransportModeType,
  TransportSubmodeType,
} from './common';

export const ZoneSelectionMode = z.union([
  z.literal('none'),
  z.literal('single'),
  z.literal('single-stop'),
  z.literal('single-zone'),
  z.literal('multiple'),
  z.literal('multiple-stop'),
  z.literal('multiple-zone'),
]);

export const TravellerSelectionMode = z.union([
  z.literal('multiple'),
  z.literal('single'),
  z.literal('none'),
]);

export const TimeSelectionMode = z.union([
  z.literal('datetime'),
  z.literal('next-morning'),
  z.literal('next-morning-minimum'),
  z.literal('none'),
]);

export const ProductSelectionMode = z.union([
  z.literal('duration'),
  z.literal('product'),
  z.literal('productAlias'),
  z.literal('none'),
]);

export const ProductTypeTransportModes = z.object({
  mode: TransportModeType,
  subMode: TransportSubmodeType.optional(),
});

export const FareProductTypeConfigSettings = z.object({
  zoneSelectionMode: ZoneSelectionMode,
  travellerSelectionMode: TravellerSelectionMode,
  timeSelectionMode: TimeSelectionMode,
  productSelectionMode: ProductSelectionMode,
  productSelectionTitle: LanguageAndTextTypeArray.optional(),
  requiresLogin: z.boolean(),
});

export const FareProductTypeConfig = z.object({
  type: z.string(),
  illustration: z.string().optional(),
  name: LanguageAndTextTypeArray,
  transportModes: z.array(ProductTypeTransportModes),
  excludedTariffZones: z.array(z.string()).optional(),
  description: LanguageAndTextTypeArray,
  purchaseMessage: LanguageAndTextTypeArray,
  configuration: FareProductTypeConfigSettings,
});

export type ProductTypeTransportModes = z.infer<
  typeof ProductTypeTransportModes
>;
export type ZoneSelectionMode = z.infer<typeof ZoneSelectionMode>;
export type TravellerSelectionMode = z.infer<typeof TravellerSelectionMode>;
export type TimeSelectionMode = z.infer<typeof TimeSelectionMode>;
export type ProductSelectionMode = z.infer<typeof ProductSelectionMode>;
export type FareProductTypeConfigSettings = z.infer<
  typeof FareProductTypeConfigSettings
>;
export type FareProductTypeConfig = z.infer<typeof FareProductTypeConfig>;
