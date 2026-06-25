import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';

export const RefundReason = z.object({
  id: z.string(),
  name: LanguageAndTextTypeArray,
});

export const RefundReasons = z.object({
  refundReasons: z.array(RefundReason).default([]),
});

export type RefundReasonType = z.infer<typeof RefundReason>;
export type RefundReasonsType = z.infer<typeof RefundReasons>;
