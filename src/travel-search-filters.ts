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

export const TransportModeFilterOptionType = z.object({
  id: z.string(),
  icon: TravelSearchTransportModeIcon,
  text: LanguageAndTextTypeArray.nonempty(),
  description: LanguageAndTextTypeArray.optional(),
  modes: z.array(TravelSearchTransportModes),
});

export const FlexibleTransportOptionType = z.object({
  id: z.string(),
  title: LanguageAndTextTypeArray.nonempty(),
  label: LabelType.optional(),
  description: LanguageAndTextTypeArray.nonempty(),
});

export const TravelSearchPreferenceType = z.union([
  z.literal('transferPenalty'),
  z.literal('waitReluctance'),
  z.literal('walkReluctance'),
  z.literal('walkSpeed'),
])
export const TravelSearchPreferenceOptionId = z.string().nonempty();
export const TravelSearchPreferenceOption = z.object({
  id: TravelSearchPreferenceOptionId,
  text: LanguageAndTextTypeArray.nonempty(),
  value: z.number().nonnegative(),
})

export const TravelSearchPreference = z.object({
  type: TravelSearchPreferenceType,
  title: LanguageAndTextTypeArray.nonempty(),
  options: TravelSearchPreferenceOption.array().nonempty(),
  defaultOption: TravelSearchPreferenceOptionId,
})

export const TravelSearchFiltersType = z.object({
  transportModes: TransportModeFilterOptionType.array().optional(),
  flexibleTransport: FlexibleTransportOptionType.optional(),
  travelSearchPreferences: TravelSearchPreference.array().optional(),
});

export type TravelSearchTransportModes = z.infer<
  typeof TravelSearchTransportModes
>;
export type TravelSearchTransportModeIcon = z.infer<
  typeof TravelSearchTransportModeIcon
>;

export type TravelSearchFiltersType = z.infer<typeof TravelSearchFiltersType>;
export type FlexibleTransportOptionType = z.infer<
  typeof FlexibleTransportOptionType
>;
export type TransportModeFilterOptionType = z.infer<
  typeof TransportModeFilterOptionType
>;

export type TravelSearchPreferenceOptionId = z.infer<typeof TravelSearchPreferenceOptionId>;
export type TravelSearchPreferenceOption = z.infer<typeof TravelSearchPreferenceOption>;
export type TravelSearchPreference = z.infer<typeof TravelSearchPreference>