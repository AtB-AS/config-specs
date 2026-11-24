import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';

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

export const PriceAdjustmentEnum = z.enum(['FREE_UNLOCK', 'FREE_MINUTES']);
export type PriceAdjustmentEnumType = z.infer<typeof PriceAdjustmentEnum>;

// The benefit texts are now served by the benefit service (title/description
// and notEligibleTitle/notEligibleDescription), so these config texts are
// outdated. They are still read by the station sheets until those stop showing
// benefits.
const deprecatedBenefitText = {
  deprecated: true,
  description:
    'Deprecated: benefit texts are served by the benefit service. Still read by the station sheets.',
};

export const OperatorBenefit = z.object({
  id: OperatorBenefitId,
  imageWhenActive: z.string().optional(),
  /** @deprecated Use the title from the benefit service instead. */
  headingWhenActive: LanguageAndTextTypeArray.optional().meta(
    deprecatedBenefitText,
  ),
  /** @deprecated Use the description from the benefit service instead. */
  descriptionWhenActive: LanguageAndTextTypeArray.meta(deprecatedBenefitText),
  imageWhenNotActive: z.string().optional(),
  /** @deprecated Use notEligibleTitle from the benefit service instead. */
  headingWhenNotActive: LanguageAndTextTypeArray.optional().meta(
    deprecatedBenefitText,
  ),
  /** @deprecated Use notEligibleDescription from the benefit service instead. */
  descriptionWhenNotActive: LanguageAndTextTypeArray.meta(
    deprecatedBenefitText,
  ),
  callToAction: z.object({
    url: z.string(),
    name: LanguageAndTextTypeArray.optional(),
  }),
  /** @deprecated Use the title and description from the benefit service instead. */
  ticketDescription: LanguageAndTextTypeArray.optional().meta({
    deprecated: true,
    description:
      'Deprecated: benefit texts are served by the benefit service. No longer read by the app.',
  }),
  formFactors: z.array(FormFactor).nonempty(),
});

export type OperatorBenefitType = z.infer<typeof OperatorBenefit>;

export const PriceAdjustment = z.object({
  amount: z.number(),
  description: z.string(),
  type: PriceAdjustmentEnum,
  systemIds: z.string().array().default([]),
});

export type PriceAdjustmentType = z.infer<typeof PriceAdjustment>;

export const PriceAdjustmentsByFormFactor = z.partialRecord(
  FormFactor,
  z.array(PriceAdjustment),
);

export type PriceAdjustmentsByFormFactorType = Partial<
  Record<FormFactorType, PriceAdjustmentType[]>
>;

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
  support: z
    .object({
      phone: z.string().optional(),
      chatUrl: z.url().optional(),
      websiteUrl: z.url().optional(),
    })
    .optional(),
});

export type MobilityOperatorType = z.infer<typeof MobilityOperator>;

export const ShmoFaq = z
  .object({
    id: z.string(),
  })
  .merge(titleAndDescription);

export type ShmoFaqType = z.infer<typeof ShmoFaq>;

export const ConsentLine = z.object({
  id: z.string().nonempty(),
  illustration: z.string().optional(),
  description: LanguageAndTextTypeArray.nonempty(),
});

export type ConsentLineType = z.infer<typeof ConsentLine>;
