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

export const TravelSearchTransport = z.object({
  id: z.string(),
  icon: TravelSearchTransportModeIcon,
  text: LanguageAndTextTypeArray.nonempty(),
  description: LanguageAndTextTypeArray.optional(),
  modes: z.array(TravelSearchTransportModes),
});

export const TravelSearchFiltersType = z.object({
  transportModes: TravelSearchTransport.array().optional(),
});

export type TravelSearchTransportModes = z.infer<
  typeof TravelSearchTransportModes
>;
export type TravelSearchTransportModeIcon = z.infer<
  typeof TravelSearchTransportModeIcon
>;
export type TravelSearchFiltersType = z.infer<typeof TravelSearchFiltersType>;
export type TravelSearchTransport = z.infer<typeof TravelSearchTransport>;
