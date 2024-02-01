import {z} from 'zod';

export const Consent = z.object({
  id: z.number(),
  title: z.object({
    nob: z.string(),
    en: z.string().optional(),
    nno: z.string().optional(),
  }),
  description: z
    .object({
      nob: z.string(),
      en: z.string().optional(),
      nno: z.string().optional(),
    })
    .optional(),
});

export const Consents = z.object({
  consents: z.array(Consent),
});

export type ConsentType = z.infer<typeof Consent>;
export type ConsentsType = z.infer<typeof Consents>;
