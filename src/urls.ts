import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';

export const AppVersionedConfigurableLinkSchema = z.object({
  configurableLink: LanguageAndTextTypeArray,
  appVersionMin: z.string().optional(),
  appVersionMax: z.string().optional(),
});
export type AppVersionedConfigurableLink = z.infer<
  typeof AppVersionedConfigurableLinkSchema
>;

export const ConfigurableLinksSchema = z.object({
  ticketingInfo: LanguageAndTextTypeArray.optional(),
  termsInfo: LanguageAndTextTypeArray.optional(),
  inspectionInfo: LanguageAndTextTypeArray.optional(),
  refundInfo: LanguageAndTextTypeArray.optional(),
  flexTransportInfo: LanguageAndTextTypeArray.optional(),
  dataSharingInfo: LanguageAndTextTypeArray.optional(),
  appA11yStatement: LanguageAndTextTypeArray.optional(),
  iosStoreListing: LanguageAndTextTypeArray.optional(),
  androidStoreListing: LanguageAndTextTypeArray.optional(),
  externalRealtimeMap: LanguageAndTextTypeArray.optional(),
  /** @deprecated Use tileServerBaseUrls instead. */
  tileServerBaseUrl: LanguageAndTextTypeArray.optional(),
  tileServerBaseUrls: z.array(AppVersionedConfigurableLinkSchema).optional(),
  /** @deprecated Use mapboxSpriteUrls instead. */
  mapboxSpriteUrl: LanguageAndTextTypeArray.optional(),
  mapboxSpriteUrls: z.array(AppVersionedConfigurableLinkSchema).optional(),
  mobilityTermsUrl: LanguageAndTextTypeArray.optional(),
  contactFormUrl: LanguageAndTextTypeArray.optional(),
  lostAndFoundUrl: LanguageAndTextTypeArray.optional(),
  frequentlyAskedQuestionsUrl: LanguageAndTextTypeArray.optional(),
  sparReadMoreUrl: LanguageAndTextTypeArray.optional(),
});

export type ConfigurableLinks = z.infer<typeof ConfigurableLinksSchema>;
