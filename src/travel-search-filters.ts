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

export const TravelSearchPreference = z.object({
  title: LanguageAndTextTypeArray.nonempty(),
  value: z.number().nonnegative(),
  isDefaultOption: z.boolean().optional(),
})

export const TravelSearchPreferences = z.object({
  transferSlackOptions: TravelSearchPreference.array().optional(),
  walkSpeedOptions: TravelSearchPreference.array().optional(),
})

export const TravelSearchFiltersType = z.object({
  transportModes: TransportModeFilterOptionType.array().optional(),
  flexibleTransport: FlexibleTransportOptionType.optional(),
  travelSearchPreferences: TravelSearchPreferences.optional(),
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

export type TravelSearchPreferenceType = z.infer<typeof TravelSearchPreference>
export type TravelSearchPreferencesType = z.infer<typeof TravelSearchPreferences>