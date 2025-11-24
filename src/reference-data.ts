import {z} from 'zod';
import {LanguageAndTextType, LanguageAndTextTypeArray} from './common';
import {ZoneSelectionMode} from './fare-product-type';
import {optionalNullish} from './utils/nullish';

export const PreassignedFareProduct = z.object({
  id: z.string(),
  version: z.string(),
  type: z.string(),
  distributionChannel: z.array(z.string()),
  name: LanguageAndTextType,
  limitations: z.object({
    userProfileRefs: z.array(z.string()),
    appVersionMin: optionalNullish(z.string()),
    appVersionMax: optionalNullish(z.string()),
    fareZoneRefs: optionalNullish(z.array(z.string())),

    /**
     * @deprecated use fareZoneRefs instead
     */
    tariffZoneRefs: optionalNullish(z.array(z.string())),
    supplementProductRefs: optionalNullish(z.array(z.string())),
  }),
  durationDays: optionalNullish(z.number()),
  isApplicableOnSingleZoneOnly: optionalNullish(z.boolean()),
  isBookingEnabled: optionalNullish(z.boolean()),
  isEnabledForTripSearchOffer: optionalNullish(z.boolean()),
  isDefault: optionalNullish(z.boolean()),
  isSupplementProduct: optionalNullish(z.boolean()),
  alternativeNames: optionalNullish(LanguageAndTextTypeArray),
  zoneSelectionMode: optionalNullish(ZoneSelectionMode),
  description: optionalNullish(LanguageAndTextTypeArray),
  productDescription: optionalNullish(LanguageAndTextTypeArray),
  productAliasId: optionalNullish(z.string()),
  productAlias: optionalNullish(LanguageAndTextTypeArray),
  warningMessage: optionalNullish(LanguageAndTextTypeArray),
});

export const SupplementProduct = z.object({
  id: z.string(),
  version: z.string(),
  illustration: optionalNullish(z.string()),
  distributionChannel: z.array(z.string()),
  name: LanguageAndTextType,
  alternativeNames: optionalNullish(LanguageAndTextTypeArray),
  description: optionalNullish(LanguageAndTextTypeArray),
  isBaggageProduct: optionalNullish(z.boolean()),
  baggageType: optionalNullish(z.string()),
  limitations: optionalNullish(
    z
      .object({
        appVersionMin: optionalNullish(z.string()),
        appVersionMax: optionalNullish(z.string()),
      })
      .optional(),
  ),
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
  description: LanguageAndTextTypeArray.optional(),
  isDefault: z.boolean().optional(),
});

export const FareZone = z.object({
  id: z.string(),
  name: LanguageAndTextType,
  version: z.string(),
  geometry: z.object({
    type: z.literal('Polygon'),
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
    type: z.literal('Polygon'),
    coordinates: z.array(z.array(z.array(z.number()).length(2))),
  }),
});

export const CarPoolingZone = z.object({
  id: z.string(),
  name: z.string(),
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
  fareZones: z.array(FareZone),
  userProfiles: z.array(UserProfile),
  cityZones: z.array(CityZone).optional(),
  carPoolingZones: z.array(CarPoolingZone).optional(),
  supplementProducts: z.array(SupplementProduct).optional(),

  /**
   * @deprecated Use preassignedFareProducts_v2 instead
   */
  preassignedFareProducts: z.any().optional(),

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
export type CarPoolingZone = z.infer<typeof CarPoolingZone>;
export type UserProfile = z.infer<typeof UserProfile>;
export type ReferenceData = z.infer<typeof ReferenceData>;
export type SupplementProduct = z.infer<typeof SupplementProduct>;
