import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';

export const NotificationGroup = z.object({
  id: z.string(),
  enabled: z.boolean(),
  salesPackages: z.array(z.string()),
  toggleDescription: LanguageAndTextTypeArray,
  toggleTitle: LanguageAndTextTypeArray,
});
export const NotificationGroups = z.array(NotificationGroup);

export const NotificationMode = z.object({
  id: z.string(),
  enabled: z.boolean(),
});
export const NotificationModes = z.array(NotificationMode);

export const NotificationConfig = z.object({
  groups: NotificationGroups,
  modes: NotificationModes,
});

export type NotificationGroupType = z.infer<typeof NotificationGroup>;
export type NotificationModeType = z.infer<typeof NotificationMode>;
export type NotificationConfigType = z.infer<typeof NotificationConfig>;
