import {z} from 'zod';

export const Consent = z.object({
  id: z.number(),
  title: z.object({
    nob: z.string(),
    en: z.string().nullish(),
    nno: z.string().nullish(),
  }),
  description: z
    .object({
      nob: z.string(),
      en: z.string().nullish(),
      nno: z.string().nullish(),
    })
    .nullish(),
});

export const Consents = z.object({
  consents: z.array(Consent),
});

export type ConsentType = z.infer<typeof Consent>;
export type ConsentsType = z.infer<typeof Consents>;
