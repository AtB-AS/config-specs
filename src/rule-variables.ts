import {z} from 'zod';
import {LanguageAndTextType} from './common';

/**
 * Defines rule variables that can be referenced in the app's rule engine.
 * These are the variables available for use in rules, not the rules themselves.
 */
export const RuleVariableType = z.enum(['Custom', 'Inbuilt']);

const RuleVariableBase = z.object({
  variableName: z.string(),
  variableDescription: LanguageAndTextType.optional(),
  variableType: RuleVariableType,
});

/**
 * Zone rule variables
 */
export const ZoneRuleVariableGeometryType = z.enum(['Reference', 'Inline']);
export const ZoneRuleVariableGeometryReferenceType = z.enum([
  'FareZone',
  'CityZone',
]);

/**
 * Reference zone variables point to zones defined in reference data
 */
const ReferenceZoneRuleVariable = RuleVariableBase.extend({
  geometryType: z.literal(ZoneRuleVariableGeometryType.Values.Reference),
  referenceType: z.enum(['FareZone', 'CityZone']),
  referenceIds: z.array(z.string()), // IDs from FareZone or CityZone in reference data
});

/**
 * Inline zone variables contain their own geometry
 */
const InlineZoneRuleVariable = RuleVariableBase.extend({
  geometryType: z.literal(ZoneRuleVariableGeometryType.Values.Inline),
  geometry: z.object({
    type: z.literal('Polygon'),
    coordinates: z.array(z.array(z.array(z.number()).length(2))),
  }),
});

export const FlexibleTransportZoneRuleVariable =
  ReferenceZoneRuleVariable.extend({
    variableName: z.literal('flexibleTransportZone'),
    variableType: z.literal(RuleVariableType.Values.Inbuilt),
    referenceType: z.literal(
      ZoneRuleVariableGeometryReferenceType.Values.CityZone,
    ),
  });

export const CarPoolingZoneRuleVariable = InlineZoneRuleVariable.extend({
  variableName: z.literal('carPoolingZone'),
  variableType: z.literal(RuleVariableType.Values.Inbuilt),
});

export const CustomInlineZoneRuleVariable = InlineZoneRuleVariable.extend({
  variableType: z.literal(RuleVariableType.Values.Custom),
});

export const CustomReferenceZoneRuleVariable = ReferenceZoneRuleVariable.extend(
  {
    variableType: z.literal(RuleVariableType.Values.Custom),
  },
);

export const ZoneRuleVariable = z.union([
  FlexibleTransportZoneRuleVariable,
  CarPoolingZoneRuleVariable,
  CustomInlineZoneRuleVariable,
  CustomReferenceZoneRuleVariable,
]);

export const RuleVariables = z.object({
  zoneRuleVariables: z.array(ZoneRuleVariable).optional(),
});

export type ZoneRuleVariable = z.infer<typeof ZoneRuleVariable>;
export type FlexibleTransportZoneRuleVariable = z.infer<
  typeof FlexibleTransportZoneRuleVariable
>;
export type CarPoolingZoneRuleVariable = z.infer<
  typeof CarPoolingZoneRuleVariable
>;
export type CustomInlineZoneRuleVariable = z.infer<
  typeof CustomInlineZoneRuleVariable
>;
export type CustomReferenceZoneRuleVariable = z.infer<
  typeof CustomReferenceZoneRuleVariable
>;
export type RuleVariables = z.infer<typeof RuleVariables>;
