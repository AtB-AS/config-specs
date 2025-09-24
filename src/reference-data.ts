import {z} from 'zod/v4';
import {LanguageAndTextType, LanguageAndTextTypeArray} from './common';
import {ZoneSelectionMode} from './fare-product-type';
import {nullishToOptional} from './utils/nullish-to-optional';

// export const PreassignedFareProduct = z.object({
//   id: z.string(),
//   version: z.string(),
//   type: z.string(),
//   distributionChannel: z.array(z.string()),
//   name: LanguageAndTextType,
//   limitations: z.object({
//     userProfileRefs: z.array(z.string()),
//     appVersionMin: z.string().nullish().transform(nullishToOptional),
//     appVersionMax: z.string().nullish().transform(nullishToOptional),
//     fareZoneRefs: z.array(z.string()).nullish().transform(nullishToOptional),

//     /**
//      * @deprecated use fareZoneRefs instead
//      */
//     tariffZoneRefs: z.array(z.string()).nullish().transform(nullishToOptional),
//   }),
//   durationDays: z.number().nullish().transform(nullishToOptional),
//   isApplicableOnSingleZoneOnly: z
//     .boolean()
//     .nullish()
//     .transform(nullishToOptional),
//   isBookingEnabled: z.boolean().nullish().transform(nullishToOptional),
//   isEnabledForTripSearchOffer: z
//     .boolean()
//     .nullish()
//     .transform(nullishToOptional),
//   isDefault: z.boolean().nullish().transform(nullishToOptional),
//   alternativeNames:
//     LanguageAndTextTypeArray.nullish().transform(nullishToOptional),
//   zoneSelectionMode: ZoneSelectionMode.nullish().transform(nullishToOptional),
//   description: LanguageAndTextTypeArray.nullish().transform(nullishToOptional),
//   productDescription:
//     LanguageAndTextTypeArray.nullish().transform(nullishToOptional),
//   productAliasId: z.string().nullish().transform(nullishToOptional),
//   productAlias: LanguageAndTextTypeArray.nullish().transform(nullishToOptional),
//   warningMessage:
//     LanguageAndTextTypeArray.nullish().transform(nullishToOptional),
// });

const opt = <T extends z.ZodTypeAny>(base: T, includeTransform: boolean) =>
  includeTransform
    ? base.nullish().transform(nullishToOptional)
    : base.optional();

const getPreassignedFareProduct = (includeTransform = false) =>
  z.object({
    id: z.string(),
    version: z.string(),
    type: z.string(),
    distributionChannel: z.array(z.string()),
    name: LanguageAndTextType,
    limitations: z.object({
      userProfileRefs: z.array(z.string()),
      appVersionMin: opt(z.string(), includeTransform),
      appVersionMax: opt(z.string(), includeTransform),
      fareZoneRefs: opt(z.array(z.string()), includeTransform),

      /**
       * @deprecated use fareZoneRefs instead
       */
      tariffZoneRefs: opt(z.array(z.string()), includeTransform),
    }),
    durationDays: opt(z.number(), includeTransform),
    isApplicableOnSingleZoneOnly: opt(z.boolean(), includeTransform),
    isBookingEnabled: opt(z.boolean(), includeTransform),
    isEnabledForTripSearchOffer: opt(z.boolean(), includeTransform),
    isDefault: opt(z.boolean(), includeTransform),
    alternativeNames: opt(LanguageAndTextTypeArray, includeTransform),
    zoneSelectionMode: opt(ZoneSelectionMode, includeTransform),
    description: opt(LanguageAndTextTypeArray, includeTransform),
    productDescription: opt(LanguageAndTextTypeArray, includeTransform),
    productAliasId: opt(z.string(), includeTransform),
    productAlias: opt(LanguageAndTextTypeArray, includeTransform),
    warningMessage: opt(LanguageAndTextTypeArray, includeTransform),
  });

export const PreassignedFareProduct = getPreassignedFareProduct(true);

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

const getReferenceData = (includeTransform: boolean) =>
  z.object({
    preassignedFareProducts_v2: z.array(
      getPreassignedFareProduct(includeTransform),
    ),
    fareZones: z.array(FareZone),
    userProfiles: z.array(UserProfile),
    cityZones: z.array(CityZone).optional(),
    carPoolingZones: z.array(CarPoolingZone).optional(),

    /**
     * @deprecated Use preassignedFareProducts_v2 instead
     */
    preassignedFareProducts: z.any(),

    /**
     * @deprecated Use fareZones instead
     */
    tariffZones: z.array(TariffZone),
  });
export const ReferenceData = getReferenceData(true);
export const ReferenceDataJsonSchema = getReferenceData(false);

export type PreassignedFareProduct = z.infer<typeof PreassignedFareProduct>;

/** @deprecated Use {@link FareZone} instead */
export type TariffZone = z.infer<typeof TariffZone>;

export type FareZone = z.infer<typeof FareZone>;
export type CityZone = z.infer<typeof CityZone>;
export type CarPoolingZone = z.infer<typeof CarPoolingZone>;
export type UserProfile = z.infer<typeof UserProfile>;
export type ReferenceData = z.infer<typeof ReferenceData>;
