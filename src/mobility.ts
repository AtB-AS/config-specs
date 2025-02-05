import {z} from 'zod';
import {LanguageAndTextTypeArray} from './common';

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
      brandLastModified: z
        .date()
        .describe(
          'Date that indicates the last time any included brand assets were updated or modified.',
        ),
      brandTermsUrl: z
        .string()
        .url()
        .optional()
        .describe(
          'A fully qualified URL pointing to the location of a page that defines the license terms of brand icons, colors, or other trademark information. This field MUST NOT take the place of license_url or license_id.',
        ),
      brandImageUrl: z
        .string()
        .describe(
          'A fully qualified URL pointing to the location of a graphic file representing the brand for the service. File MUST be in SVG V1.1 format and MUST be either square or round.',
        ),
      brandImageUrlDark: z
        .string()
        .optional()
        .describe(
          'A fully qualified URL pointing to the location of a graphic file representing the brand for the service for use in dark mode applications. File MUST be in SVG V1.1 format and MUST be either square or round.',
        ),
      color: z
        .string()
        .optional()
        .describe(
          'Color used to represent the brand for the service expressed as a 6 digit hexadecimal color code in the form #000000.',
        ),
    })
    .optional()
    .describe('modeled 1-1 like brandAssets in GBFS'),
});

export type MobilityOperatorType = z.infer<typeof MobilityOperator>;

export const ScooterFaq = z.object({
  id: z.string(),
  title: LanguageAndTextTypeArray.nonempty(),
  description: LanguageAndTextTypeArray.nonempty(),
});

export type ScooterFaqType = z.infer<typeof ScooterFaq>;
