export type ZodConstructor<TSchema extends Zod.ZodTypeAny> = new (
	def: any,
) => TSchema;
export type ZodConstructorOrSchema<TSchema extends Zod.ZodTypeAny> =
	| TSchema
	| ZodConstructor<TSchema>;

export type Condition<TSchema extends Zod.ZodTypeAny> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
}) => boolean;

export type Generator<TSchema extends Zod.ZodTypeAny> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
}) => unknown;

export interface Definition<TSchema extends Zod.ZodTypeAny> {
	schema: ZodConstructorOrSchema<TSchema>;
	test: Condition<TSchema>;
	output: Generator<TSchema>;
}

export function Generator<TSchema extends Zod.ZodTypeAny>(
	definition: Definition<TSchema>,
) {
	return definition;
}
