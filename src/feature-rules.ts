import {z} from 'zod';
import {LanguageAndTextType} from './common';

/**
 * Specifies if the feature rule is a custom rule defined dynamically (for instance for announcements),
 * or an inbuilt rule which is evaluated some specific way in the app.
 */
export const FeatureRuleType = z.enum(['Custom', 'Inbuilt']);

const FeatureRuleBase = z.object({
  ruleName: z.string(),
  ruleDescription: LanguageAndTextType.optional(),
  ruleType: FeatureRuleType,
  isEnabled: z.boolean(),
});

export const ZoneFeatureGeometryType = z.enum(['Reference', 'Inline']);
export const ZoneFeatureGeometryReferenceType = z.enum([
  'FareZone',
  'CityZone',
]);

const ZoneFeatureRuleInline = FeatureRuleBase.extend({
  geometryType: z.literal(ZoneFeatureGeometryType.Values.Inline),
  geometries: z.array(
    z.object({
      type: z.literal('Polygon'),
      coordinates: z.array(z.array(z.array(z.number()).length(2))),
    }),
  ),
});

const ZoneFeatureRuleReference = FeatureRuleBase.extend({
  geometryType: z.literal(ZoneFeatureGeometryType.Values.Reference),
  referenceType: ZoneFeatureGeometryReferenceType,
  zoneIds: z.array(z.string()),
});

export const FlexibleTransportZoneFeatureRule = ZoneFeatureRuleReference.extend(
  {
    ruleName: z.literal('isWithinFlexibleTransportZone'),
    ruleType: z.literal(FeatureRuleType.Values.Inbuilt),
    referenceType: z.literal(ZoneFeatureGeometryReferenceType.Values.CityZone),
  },
);

export const CarPoolingZoneFeatureRule = ZoneFeatureRuleInline.extend({
  ruleName: z.literal('isWithinCarPoolingZone'),
  ruleType: z.literal(FeatureRuleType.Values.Inbuilt),
});

export const CustomZoneFeatureRuleInline = ZoneFeatureRuleInline.extend({
  ruleType: z.literal(FeatureRuleType.Values.Custom),
});

export const CustomZoneFeatureRuleReference = ZoneFeatureRuleReference.extend({
  ruleType: z.literal(FeatureRuleType.Values.Custom),
});

export const ZoneFeatureRule = z.union([
  FlexibleTransportZoneFeatureRule,
  CarPoolingZoneFeatureRule,
  CustomZoneFeatureRuleInline,
  CustomZoneFeatureRuleReference,
]);

export const FeatureRules = z.object({
  zoneFeatureRules: z.array(ZoneFeatureRule).optional(),
});

export type ZoneFeatureRule = z.infer<typeof ZoneFeatureRule>;
export type FlexibleTransportZoneFeatureRule = z.infer<
  typeof FlexibleTransportZoneFeatureRule
>;
export type CarPoolingZoneFeatureRule = z.infer<
  typeof CarPoolingZoneFeatureRule
>;
export type CustomZoneFeatureRuleInline = z.infer<
  typeof CustomZoneFeatureRuleInline
>;
export type CustomZoneFeatureRuleReference = z.infer<
  typeof CustomZoneFeatureRuleReference
>;
export type FeatureRules = z.infer<typeof FeatureRules>;
