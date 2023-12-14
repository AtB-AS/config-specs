import {z} from "zod";
import {LanguageAndTextTypeArray} from './common';

export const FormFactor = z.union([
  z.literal("SCOOTER"),
  z.literal("BICYCLE"),
  z.literal("CAR"),
])

export const OperatorBenefitId = z.union([
  z.literal("free-unlock"),
  z.literal('free-use'),
  z.literal('single-unlock')
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
})

export type OperatorBenefitType = z.infer<typeof OperatorBenefit>;

export const MobilityOperator = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  showInApp: z.boolean().default(false),
  formFactors: z.array(FormFactor).nonempty(),
  benefits: z.array(OperatorBenefit).optional().default([])
});

export type MobilityOperatorType = z.infer<typeof MobilityOperator>;