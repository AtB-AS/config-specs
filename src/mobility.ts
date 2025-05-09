import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';

export const titleAndDescription = z.object({
  title: LanguageAndTextTypeArray.nonempty(),
  description: LanguageAndTextTypeArray.nonempty(),
});

export const FormFactor = z.union([
  z.literal('SCOOTER'),
  z.literal('BICYCLE'),
  z.literal('CAR'),
]);

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

export const MobilityOperator = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  showInApp: z.boolean().default(false),
  formFactors: z.array(FormFactor).nonempty(),
  benefits: z.array(OperatorBenefit).optional().default([]),
  brandAssets: z
    .object({
      brandLastModified: z.date(),
      brandTermsUrl: z.string().url().optional(),
      brandImageUrl: z.string(),
      brandImageUrlDark: z.string().optional(),
      color: z.string().optional(),
    })
    .optional()
    .describe('modeled 1-1 like brandAssets in EnTur mobility API'),
  isDeepIntegrationEnabled: z.boolean().default(false),
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
  productDescription: titleAndDescription,
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
  amountByEnrollment: z.array(
    z.object({
      enrollmentId: z.string().optional(), // which enrollment (pilot group) a user is in
      amount: z.number().int().positive(),
    }),
  ),
});

export type BonusSourceType = z.infer<typeof BonusSource>;
