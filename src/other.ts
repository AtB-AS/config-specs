import {z} from 'zod';
import {TransportSubmodeType} from './common';

export const OfferSearchMode = z.enum(['zone', 'stop-place']);
export const LoginMethod = z.enum(['otp', 'email', 'vipps']);

export const Other = z.object({
  vatPercent: z.number(),
  enableTokenToggleRestrictions: z.boolean().optional(),
  enableNynorsk: z.boolean().optional(),
  tokenToggleMaxLimit: z.number().optional(),
  travelcardNumberLength: z.number().default(16),
  modesWeSellTicketsFor: z.array(TransportSubmodeType).optional(),
  nextMorningUtcTimestamp: z.string().regex(/^\d{2}:\d{2}$/).default("04:00"),
  defaultFocusPoint: z.object({
    lat: z.number(),
    lon: z.number(),
  }).optional(),
  defaultTariffZone: z.string().optional(),
  defaultOfferSearchMode: OfferSearchMode.optional(),
  disabledLoginMethods: z.object({
    app: z.array(LoginMethod).optional(),
    web: z.array(LoginMethod).optional(),
  }).optional(),
});

export type OfferSearchMode = z.infer<typeof OfferSearchMode>;
export type LoginMethod = z.infer<typeof LoginMethod>;
export type Other = z.infer<typeof Other>;
