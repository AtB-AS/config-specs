/**
 * For use in cases where you want a value to be "optional" / `T | undefined`,
 * but have to accept `null`.
 *
 * @example
 * ```ts
 * const Foo =  z.string().nullish().transform(nullishToOptional)
 * type Foo = z.infer<typeof Foo>; // `type Foo = string | undefined`
 * ```
 */
export function nullishToOptional<T>(
  value: T | null | undefined,
): T | undefined {
  return value ?? undefined;
}

/**
 * Wraps a schema so that:
 * - `null` and `undefined` inputs become `undefined`
 * - The inferred type is `T | undefined`
 * - When used in an object schema, the property is optional
 *
 * @example
 * ```ts
 * const Foo = optionalNullish(z.string());
 * type Foo = z.infer<typeof Foo>; // string | undefined
 *
 * const Obj = z.object({ foo: optionalNullish(z.string()) });
 * // type Obj = { foo?: string | undefined }
 * ```
 */
export const optionalNullish = <T extends z.ZodTypeAny>(base: T) =>
  base.nullish().transform(nullishToOptional).optional();
