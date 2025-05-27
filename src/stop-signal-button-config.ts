import {z} from 'zod';
import {TransportModeType, TransportSubmodeType} from './common';

export const StopSignalModeAndSubmodes = z.object({
  mode: TransportModeType,
  submodes: z.array(TransportSubmodeType).nullish(),
});

export const StopSignalButtonConfig = z.object({
  activationWindowStartMinutesBefore: z.number().default(60),
  activationWindowEndMinutesBefore: z.number().default(2),
  modes: z
    .array(StopSignalModeAndSubmodes)
    .default([{mode: 'bus'}, {mode: 'tram'}]),
});

export type StopSignalButtonConfigType = z.infer<typeof StopSignalButtonConfig>;
export type StopSignalModeAndSubmodesType = z.infer<
  typeof StopSignalModeAndSubmodes
>;
