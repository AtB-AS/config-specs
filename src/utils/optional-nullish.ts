import z from 'zod';
import {nullishToOptional} from './nullish-to-optional';

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
