import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';
import {title} from 'process';

export const titleAndDescription = z.object({
  title: LanguageAndTextTypeArray.nonempty(),
  description: LanguageAndTextTypeArray.nonempty(),
});

export const titleAndOptionalDescription = z.object({
  title: LanguageAndTextTypeArray.nonempty(),
  description: LanguageAndTextTypeArray.nonempty().optional(),
});

export const FormFactor = z.union([
  z.literal('SCOOTER'),
  z.literal('SCOOTER_STANDING'),
  z.literal('BICYCLE'),
  z.literal('CAR'),
]);
export type FormFactorType = z.infer<typeof FormFactor>;

export const OperatorBenefitId = z.union([
  z.literal('free-unlock'),
  z.literal('free-use'),
  z.literal('single-unlock'),
]);
export type OperatorBenefitIdType = z.infer<typeof OperatorBenefitId>;

export const OperatorBenefit = z.object({
  id: OperatorBenefitId,
  imageWhenActive: z.string().optional(),
  headingWhenActive: LanguageAndTextTypeArray.optional(),
  descriptionWhenActive: LanguageAndTextTypeArray,
  imageWhenNotActive: z.string().optional(),
  headingWhenNotActive: LanguageAndTextTypeArray.optional(),
  descriptionWhenNotActive: LanguageAndTextTypeArray,
  callToAction: z.object({
    url: z.string(),
    name: LanguageAndTextTypeArray.optional(),
  }),
  ticketDescription: LanguageAndTextTypeArray.optional(),
  formFactors: z.array(FormFactor).nonempty(),
});

export type OperatorBenefitType = z.infer<typeof OperatorBenefit>;

export const PriceAdjustment = z.object({
  amount: z.number(),
  description: z.string(),
});

export type PriceAdjustmentType = z.infer<typeof PriceAdjustment>;

export const PriceAdjustmentsByFormFactor = z.record(FormFactor, PriceAdjustment);

export type PriceAdjustmentsByFormFactorType =
Partial<Record<FormFactorType, PriceAdjustmentType>>;

export const MobilityOperator = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  showInApp: z.boolean().default(false),
  formFactors: z.array(FormFactor).nonempty(),
  benefits: z.array(OperatorBenefit).optional().default([]),
  priceAdjustments: PriceAdjustmentsByFormFactor.optional(),
  brandAssets: z
    .object({
      brandLastModified: z.string().date(),
      brandTermsUrl: z.string().url().optional(),
      brandImageUrl: z.string(),
      brandImageUrlDark: z.string().optional(),
      color: z.string().optional(),
    })
    .optional()
    .describe('modeled 1-1 like brandAssets in EnTur mobility API'),
  isDeepIntegrationEnabled: z.boolean().default(false),
  ageLimit: z.number().int().positive().optional(),
  appUrl: z
    .object({
      ios: z.string().url(),
      android: z.string().url(),
    })
    .optional(),
  rentalAppUriQueryParams: z.string().optional(),
});

export type MobilityOperatorType = z.infer<typeof MobilityOperator>;

export const ScooterFaq = z
  .object({
    id: z.string(),
  })
  .merge(titleAndDescription);

export type ScooterFaqType = z.infer<typeof ScooterFaq>;

export const ScooterConsentLine = z.object({
  id: z.string().nonempty(),
  illustration: z.string().optional(),
  description: LanguageAndTextTypeArray.nonempty(),
});

export type ScooterConsentLineType = z.infer<typeof ScooterConsentLine>;

export const BonusProduct = z.object({
  id: z.string().nonempty(),
  isActive: z.boolean(),
  operatorId: MobilityOperator.shape.id,
  formFactors: z.array(FormFactor).nonempty(),
  price: z.object({
    amount: z.number().int().positive(),
    currencyCode: z.literal('ATB_BONUS_POINT'),
  }),
  paymentDescription: LanguageAndTextTypeArray.nonempty(),
  productDescription: titleAndOptionalDescription,
});

export type BonusProductType = z.infer<typeof BonusProduct>;

export const BonusTexts = z.object({
  howBonusWorks: titleAndDescription,
});

export type BonusTextsType = z.infer<typeof BonusTexts>;

export const BonusSource = z.object({
  id: z.string(),
  preassignedFareProductId: z.string(),
  userProfileIds: z.array(z.string()),
  fareZones: z.array(z.string()),
  amountByEnrollment: z.array(
    z.object({
      enrollmentId: z.string().optional(), // which enrollment (pilot group) a user is in
      amount: z.number().int().positive(),
    }),
  ),
});

export type BonusSourceType = z.infer<typeof BonusSource>;
