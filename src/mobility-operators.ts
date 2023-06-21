import {z} from "zod";
import {LanguageAndTextTypeArray} from './common';

export const FormFactor = z.union([
  z.literal("SCOOTER"),
  z.literal("BICYCLE"),
  z.literal("CAR"),
])


export const OperatorBenefitId = z.literal("free-unlock");

export const OperatorBenefit = z.object({
  id: OperatorBenefitId,
  descriptionWhenActive: LanguageAndTextTypeArray.optional(),
  descriptionWhenNotActive: LanguageAndTextTypeArray.optional(),
  callToAction: LanguageAndTextTypeArray.optional(),
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