import {z} from 'zod';
import {LanguageAndTextType, LanguageAndTextTypeArray} from './common';
import {ZoneSelectionMode} from './fare-product-type';

export const PreassignedFareProduct = z.object({
  id: z.string(),
  version: z.string(),
  type: z.string(),
  distributionChannel: z.array(z.string()),
  name: LanguageAndTextType,
  limitations: z.object({
    userProfileRefs: z.array(z.string()),
    tariffZoneRefs: z.array(z.string()).optional(),
    appVersionMin: z.string().optional(),
    appVersionMax: z.string().optional(),
    latestActivationDate: z.number().optional(),
  }),
  durationDays: z.number().optional(),
  isApplicableOnSingleZoneOnly: z.boolean().optional(),
  isDefault: z.boolean().optional(),
  alternativeNames: LanguageAndTextTypeArray.optional(),
  zoneSelectionMode: ZoneSelectionMode.optional(),
  description: LanguageAndTextTypeArray.optional(),
  productDescription: LanguageAndTextTypeArray.optional(),
  productAliasId: z.string().optional(),
  productAlias: LanguageAndTextTypeArray.optional(),
  warningMessage: LanguageAndTextTypeArray.optional(),
});

export const TariffZone = z.object({
  id: z.string(),
  name: LanguageAndTextType,
  version: z.string(),
  geometry: z.object({
    type: z.string(),
    coordinates: z.array(z.array(z.array(z.number()).length(2))),
  }),
  description: LanguageAndTextTypeArray.optional(),
  isDefault: z.boolean().optional(),
});

export const CityZone = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  moreInfoUrl: LanguageAndTextTypeArray.optional(),
  orderUrl: LanguageAndTextTypeArray.optional(),
  phoneNumber: z.string().optional(),
  geometry: z.object({
    type: z.string(),
    coordinates: z.array(z.array(z.array(z.number()).length(2))),
  }),
});

export const UserProfile = z.object({
  id: z.string(),
  userTypeString: z.string(),
  userType: z.number(),
  version: z.string(),
  name: LanguageAndTextType,
  alternativeNames: LanguageAndTextTypeArray.optional(),
  description: LanguageAndTextType.optional(),
  alternativeDescriptions: LanguageAndTextTypeArray.optional(),
  hideFromDefaultTravellerSelection: z.boolean().optional(),
  minAge: z.number().optional(),
  maxAge: z.number().optional(),
  emoji: z.string().optional(),
});

export const ReferenceData = z.object({
  preassignedFareProducts_v2: z.array(PreassignedFareProduct),
  tariffZones: z.array(TariffZone),
  userProfiles: z.array(UserProfile),
  cityZones: z.array(CityZone).optional(),

  /**
   * @deprecated Use preassignedFareProducts_v2 instead
   */
  preassignedFareProducts: z.any(),
});

export type PreassignedFareProduct = z.infer<typeof PreassignedFareProduct>;
export type TariffZone = z.infer<typeof TariffZone>;
export type CityZone = z.infer<typeof CityZone>;
export type UserProfile = z.infer<typeof UserProfile>;
export type ReferenceData = z.infer<typeof ReferenceData>;
