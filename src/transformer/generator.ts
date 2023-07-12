import type { ZodTypeAny } from 'zod';
import type { Transformer } from './transformer';

export const ZOD_INSTANCE_IDENTIFIER = Symbol('ZOD_INSTANCE_IDENTIFIER');

declare module 'zod' {
	interface ZodType {
		[ZOD_INSTANCE_IDENTIFIER]?: number;
	}
}

export interface Context {
	path: (string | number)[];
}

export interface ZodConstructor<TSchema extends ZodTypeAny> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new (...args: any[]): TSchema;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	create(...args: any[]): TSchema;
}

export type ZodConstructorOrSchema<TSchema extends ZodTypeAny> =
	| TSchema
	| ZodConstructor<TSchema>;

export function isZodConstructor(
	schema: ZodConstructorOrSchema<ZodTypeAny>
): schema is ZodConstructor<ZodTypeAny> {
	return typeof schema === 'function';
}

export type Filter<TSchema extends ZodTypeAny> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	transform: Transformer;
	context: Context;
}) => boolean;

export type Generator<TSchema extends ZodTypeAny> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	transform: Transformer;
	context: Context;
}) => unknown;

export interface Definition<TSchema extends ZodTypeAny> {
	schema: ZodConstructorOrSchema<TSchema>;
	filter?: Filter<TSchema>;
	output: Generator<TSchema>;
}

export function Generator<TSchema extends ZodTypeAny>(
	definition: Definition<TSchema>
): Definition<TSchema> {
	if (!isZodConstructor(definition.schema)) {
		if (definition.schema[ZOD_INSTANCE_IDENTIFIER] === undefined)
			definition.schema[ZOD_INSTANCE_IDENTIFIER] = Generator.uuid++;
	}

	return definition;
}
Generator.uuid = 0;
