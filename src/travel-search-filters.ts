import {z} from 'zod';
import {
  LabelType,
  LanguageAndTextTypeArray,
  TransportModeType,
  TransportSubmodeType,
} from './common';

export const TravelSearchTransportModeIcon = z.object({
  transportMode: TransportModeType,
  transportSubMode: TransportSubmodeType.optional(),
});

export const TravelSearchTransportModes = z.object({
  transportMode: TransportModeType,
  transportSubModes: z.array(TransportSubmodeType).optional(),
});

export const TransportModeFilterOption = z.object({
  id: z.string(),
  icon: TravelSearchTransportModeIcon,
  text: LanguageAndTextTypeArray.nonempty(),
  description: LanguageAndTextTypeArray.optional(),
  modes: z.array(TravelSearchTransportModes),
  defaultValue: z.boolean(),
});

export const FlexibleTransportOption = z.object({
  id: z.string(),
  title: LanguageAndTextTypeArray.nonempty(),
  label: LabelType.optional(),
  description: LanguageAndTextTypeArray.nonempty(),
});

export const TravelSearchPreferenceParameter = z.union([
  z.literal('transferSlack'),
  z.literal('transferPenalty'),
  z.literal('waitReluctance'),
  z.literal('walkReluctance'),
  z.literal('walkSpeed'),
]);
export const TravelSearchPreferenceOptionId = z.string().nonempty();
export const TravelSearchPreferenceOption = z.object({
  id: TravelSearchPreferenceOptionId,
  text: LanguageAndTextTypeArray.nonempty(),
  value: z.number().nonnegative(),
});

export const TravelSearchPreference = z.object({
  type: TravelSearchPreferenceParameter,
  title: LanguageAndTextTypeArray.nonempty(),
  options: TravelSearchPreferenceOption.array().nonempty(),
  defaultOption: TravelSearchPreferenceOptionId,
});

export const TravelSearchFilters = z.object({
  transportModes: TransportModeFilterOption.array().optional(),
  flexibleTransport: FlexibleTransportOption.optional(),
  travelSearchPreferences: TravelSearchPreference.array().optional(),
});

export type TravelSearchTransportModesType = z.infer<
  typeof TravelSearchTransportModes
>;
export type TravelSearchTransportModeIconType = z.infer<
  typeof TravelSearchTransportModeIcon
>;

export type TravelSearchFiltersType = z.infer<typeof TravelSearchFilters>;
export type FlexibleTransportOptionType = z.infer<
  typeof FlexibleTransportOption
>;
export type TransportModeFilterOptionType = z.infer<
  typeof TransportModeFilterOption
>;

export type TravelSearchPreferenceParameterType = z.infer<
  typeof TravelSearchPreferenceParameter
>;
export type TravelSearchPreferenceOptionIdType = z.infer<
  typeof TravelSearchPreferenceOptionId
>;
export type TravelSearchPreferenceOptionType = z.infer<
  typeof TravelSearchPreferenceOption
>;
export type TravelSearchPreferenceType = z.infer<typeof TravelSearchPreference>;
