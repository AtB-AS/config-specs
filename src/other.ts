import {z} from 'zod';
import {TransportSubmodeType} from './common';

export const OfferSearchMode = z.enum(['zone', 'stop-place']);
export const LoginMethod = z.enum(['otp', 'email', 'vipps']);

export const Other = z.object({
  vatPercent: z.number(),
  enableTokenToggleRestrictions: z.boolean().nullish(),
  contactPhoneNumber: z
    .string()
    .regex(/^\+\d{1,3}\d{1,14}$/)
    .nullish(),
  enableNynorsk: z.boolean().nullish(),
  tokenToggleMaxLimit: z.number().nullish(),
  travelcardNumberLength: z.number().default(16),
  modesWeSellTicketsFor: z.array(TransportSubmodeType).nullish(),
  nextMorningUtcTimestamp: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .default('04:00'),
  /** @deprecated use defaultFareZone instead */
  defaultTariffZone: z.string().nullish(),
  defaultFareZone: z.string().nullish(),
  defaultOfferSearchMode: OfferSearchMode.nullish(),
  disabledLoginMethods: z
    .object({
      app: z.array(LoginMethod).nullish(),
      web: z.array(LoginMethod).nullish(),
    })
    .nullish(),
});

export type OfferSearchMode = z.infer<typeof OfferSearchMode>;
export type LoginMethod = z.infer<typeof LoginMethod>;
export type Other = z.infer<typeof Other>;
