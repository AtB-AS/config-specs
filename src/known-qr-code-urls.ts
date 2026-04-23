import {z} from 'zod';

export const KnownQrCodeUrlOpenMode = z.enum(['in-app-browser', 'open-url']);

export const KnownQrCodeUrl = z.object({
  id: z.string(),
  pattern: z.string().min(1),
  openMode: KnownQrCodeUrlOpenMode,
});

export const KnownQrCodeUrls = z.object({
  urls: z.array(KnownQrCodeUrl).default([]),
});

export type KnownQrCodeUrlType = z.infer<typeof KnownQrCodeUrl>;
export type KnownQrCodeUrlsType = z.infer<typeof KnownQrCodeUrls>;
export type KnownQrCodeUrlOpenModeType = z.infer<typeof KnownQrCodeUrlOpenMode>;
