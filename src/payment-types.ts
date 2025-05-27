import {z} from 'zod';

export const PaymentType = z.enum(['vipps', 'visa', 'mastercard', 'amex']);

export const PaymentTypes = z.object({
  app: z.array(PaymentType).nullish(),
  web: z.array(PaymentType).nullish(),
});

export type PaymentType = z.infer<typeof PaymentType>;
export type PaymentTypes = z.infer<typeof PaymentTypes>;
