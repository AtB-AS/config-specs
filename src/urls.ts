import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';

export const ConfigurableLinks = z.object({
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
});

export type ConfigurableLinksType = z.infer<typeof ConfigurableLinks>;
