import {z} from 'zod';

export const HarborConnectionOverride = z.object({
  from: z.string(),
  to: z.string(),
  isFree: z.boolean().nullish(),
});
export type HarborConnectionOverrideType = z.infer<
  typeof HarborConnectionOverride
>;

export const HarborConnectionOverrides = z.object({
  overrides: z.array(HarborConnectionOverride),
});
