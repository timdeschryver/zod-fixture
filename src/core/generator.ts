import type { Core } from './core';

export const ZOD_TYPE_IDENTIFIER = Symbol('ZOD_TYPE_IDENTIFIER');
export const ZOD_INSTANCE_IDENTIFIER = Symbol('ZOD_INSTANCE_IDENTIFIER');

declare module 'zod' {
	interface ZodType {
		[ZOD_TYPE_IDENTIFIER]?: number;
		[ZOD_INSTANCE_IDENTIFIER]?: number;
	}
}

export interface Context {
	key?: string | number;
}

export type ZodConstructor<TSchema extends Zod.ZodTypeAny> = new (
	def: any,
) => TSchema;

export type ZodConstructorOrSchema<TSchema extends Zod.ZodTypeAny> =
	| TSchema
	| ZodConstructor<TSchema>;

export type Condition<TSchema extends Zod.ZodTypeAny> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	core: Core;
}) => boolean;

export type Generator<TSchema extends Zod.ZodTypeAny> = (obj: {
	def: TSchema['_def'];
	schema: TSchema;
	core: Core;
	ctx?: Context;
}) => unknown;

export interface Definition<TSchema extends Zod.ZodTypeAny> {
	schema: ZodConstructorOrSchema<TSchema>;
	matches: Condition<TSchema>;
	output: Generator<TSchema>;
}

let vuid = 0;
export function Generator<TSchema extends Zod.ZodTypeAny>(
	definition: Definition<TSchema>,
): Definition<TSchema> {
	if (typeof definition.schema === 'function') {
		// if this is a Zod constructor and it doesn't already have a type identifier, add one to the prototype so that it will be available on all instances.
		if (definition.schema.prototype[ZOD_TYPE_IDENTIFIER] === undefined)
			definition.schema.prototype[ZOD_TYPE_IDENTIFIER] = vuid++;
	} else {
		// if this is a Zod instance and it doesn't already have an instance identifier, add one.
		if (definition.schema[ZOD_INSTANCE_IDENTIFIER] === undefined)
			definition.schema[ZOD_INSTANCE_IDENTIFIER] = vuid++;
	}

	return definition;
}
