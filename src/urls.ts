import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';

export const ConfigurableLinks = z.object({
  ticketingInfo: LanguageAndTextTypeArray.nullish(),
  termsInfo: LanguageAndTextTypeArray.nullish(),
  inspectionInfo: LanguageAndTextTypeArray.nullish(),
  refundInfo: LanguageAndTextTypeArray.nullish(),
  flexTransportInfo: LanguageAndTextTypeArray.nullish(),
  dataSharingInfo: LanguageAndTextTypeArray.nullish(),
  appA11yStatement: LanguageAndTextTypeArray.nullish(),
  iosStoreListing: LanguageAndTextTypeArray.nullish(),
  androidStoreListing: LanguageAndTextTypeArray.nullish(),
  externalRealtimeMap: LanguageAndTextTypeArray.nullish(),
  tileServerBaseUrl: LanguageAndTextTypeArray.nullish(),
  mapboxSpriteUrl: LanguageAndTextTypeArray.nullish(),
  mobilityTermsUrl: LanguageAndTextTypeArray.nullish(),
});

export type ConfigurableLinksType = z.infer<typeof ConfigurableLinks>;
