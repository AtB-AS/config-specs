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
    appVersionMin: z.string().nullish(),
    appVersionMax: z.string().nullish(),
    fareZoneRefs: z.array(z.string()).nullish(),

    /**
     * @deprecated use fareZoneRefs instead
     */
    tariffZoneRefs: z.array(z.string()).nullish(),
  }),
  durationDays: z.number().nullish(),
  isApplicableOnSingleZoneOnly: z.boolean().nullish(),
  isDefault: z.boolean().nullish(),
  alternativeNames: LanguageAndTextTypeArray.nullish(),
  zoneSelectionMode: ZoneSelectionMode.nullish(),
  description: LanguageAndTextTypeArray.nullish(),
  productDescription: LanguageAndTextTypeArray.nullish(),
  productAliasId: z.string().nullish(),
  productAlias: LanguageAndTextTypeArray.nullish(),
  warningMessage: LanguageAndTextTypeArray.nullish(),
});

/**
 * @deprecated
 *
 * Use {@link FareZone} instead
 */
export const TariffZone = z.object({
  id: z.string(),
  name: LanguageAndTextType,
  version: z.string(),
  geometry: z.object({
    type: z.literal('Polygon'),
    coordinates: z.array(z.array(z.array(z.number()).length(2))),
  }),
  description: LanguageAndTextTypeArray.nullish(),
  isDefault: z.boolean().nullish(),
});

export const FareZone = z.object({
  id: z.string(),
  name: LanguageAndTextType,
  version: z.string(),
  geometry: z.object({
    type: z.literal('Polygon'),
    coordinates: z.array(z.array(z.array(z.number()).length(2))),
  }),
  description: LanguageAndTextTypeArray.nullish(),
  isDefault: z.boolean().nullish(),
});

export const CityZone = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  moreInfoUrl: LanguageAndTextTypeArray.nullish(),
  orderUrl: LanguageAndTextTypeArray.nullish(),
  phoneNumber: z.string().nullish(),
  geometry: z.object({
    type: z.literal('Polygon'),
    coordinates: z.array(z.array(z.array(z.number()).length(2))),
  }),
});

export const UserProfile = z.object({
  id: z.string(),
  userTypeString: z.string(),
  userType: z.number(),
  version: z.string(),
  name: LanguageAndTextType,
  alternativeNames: LanguageAndTextTypeArray.nullish(),
  description: LanguageAndTextType.nullish(),
  alternativeDescriptions: LanguageAndTextTypeArray.nullish(),
  hideFromDefaultTravellerSelection: z.boolean().nullish(),
  minAge: z.number().nullish(),
  maxAge: z.number().nullish(),
  emoji: z.string().nullish(),
});

export const ReferenceData = z.object({
  preassignedFareProducts_v2: z.array(PreassignedFareProduct),
  fareZones: z.array(FareZone),
  userProfiles: z.array(UserProfile),
  cityZones: z.array(CityZone).nullish(),

  /**
   * @deprecated Use preassignedFareProducts_v2 instead
   */
  preassignedFareProducts: z.any(),

  /**
   * @deprecated Use fareZones instead
   */
  tariffZones: z.array(TariffZone),
});

export type PreassignedFareProduct = z.infer<typeof PreassignedFareProduct>;

/** @deprecated Use {@link FareZone} instead */
export type TariffZone = z.infer<typeof TariffZone>;

export type FareZone = z.infer<typeof FareZone>;
export type CityZone = z.infer<typeof CityZone>;
export type UserProfile = z.infer<typeof UserProfile>;
export type ReferenceData = z.infer<typeof ReferenceData>;
