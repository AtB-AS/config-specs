import {z} from 'zod';
import {
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
  isNew: z.boolean().optional(),
  description: LanguageAndTextTypeArray.nonempty(),
});

export const TravelSearchFiltersType = z.object({
  transportModes: TransportModeFilterOptionType.array().optional(),
  flexibleTransport: FlexibleTransportOptionType.optional(),
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
