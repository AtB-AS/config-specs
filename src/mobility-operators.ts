import {z} from "zod";

export const FormFactor = z.union([
  z.literal("SCOOTER"),
  z.literal("BICYCLE"),
  z.literal("CAR"),
])

export const MobilityOperator = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  showInApp: z.boolean().default(false),
  formFactors: z.array(FormFactor).nonempty(),
});

export type MobilityOperatorType = z.infer<typeof MobilityOperator>;