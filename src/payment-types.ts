import {z} from 'zod';

export const PaymentType = z.enum(["vipps", "visa", "mastercard"])

export const PaymentTypes = z.object({
  app: z.array(PaymentType).optional(),
  web: z.array(PaymentType).optional(),
});

export type PaymentType = z.infer<typeof PaymentType>;
export type PaymentTypes = z.infer<typeof PaymentTypes>;
