import type { ZodTypeAny } from 'zod';
import type { ZodConstructorOrSchema } from '../generator';
import { isZodConstructor, ZOD_INSTANCE_IDENTIFIER } from '../generator';
import type { Runner } from '../runner';
import { Checks } from './Checks';
import { Randomization } from './Randomization';

export class Utils {
	random: Randomization;

	constructor(private runner: Runner) {
		this.random = new Randomization(runner.defaults);
	}

	resolveValue<
		TInitial,
		TFallback extends NonNullable<TInitial>,
		TConflict extends NonNullable<TInitial>
	>(
		config:
			| {
					initial: TInitial;
					fallback: TFallback;
			  }
			| {
					initial: TInitial;
					fallback: TFallback;
					conflict: TConflict;
					resolve: (config: {
						fallback: TFallback;
						conflict: TConflict;
					}) => NonNullable<TInitial>;
			  }
	): NonNullable<TInitial> {
		const { initial, fallback } = config;

		if (initial != null) return initial;

		if ('conflict' in config) {
			const { conflict, resolve } = config;

			return conflict != null ? resolve({ fallback, conflict }) : fallback;
		} else {
			return fallback;
		}
	}

	n<T>(
		factory: (index: number) => T,
		config: number | { min: number; max: number } = this.runner.defaults.array
	): Array<T> {
		const length =
			typeof config === 'number' ? config : this.random.int(config);

		return Array.from({ length }, (_, i) => factory(i));
	}

	ifNotNever<TSchema extends ZodTypeAny>(
		schema: TSchema | null | undefined,
		assignment: (schema: TSchema) => unknown
	) {
		if (!schema || schema._def.typeName === 'ZodNever') return;
		assignment(schema);
	}

	isType<TSchema extends ZodTypeAny>(
		target: ZodConstructorOrSchema<TSchema> | undefined,
		schema: ZodTypeAny
	): schema is TSchema {
		if (!target) return false;

		if (isZodConstructor(target)) {
			if (schema._def.typeName !== target.name) {
				return false;
			}
		} else {
			if (schema._def.typeName !== target._def.typeName) {
				return false;
			}

			// If our generator was created with an instance, make sure it matches
			// the schema we're trying to generate.
			// This is particularly important for z.custom schemas.
			if (schema[ZOD_INSTANCE_IDENTIFIER] !== undefined) {
				if (schema[ZOD_INSTANCE_IDENTIFIER] !== target[ZOD_INSTANCE_IDENTIFIER])
					return false;
			}
		}
		return true;
	}

	checks<TChecks extends { kind: string }[]>(checks: TChecks) {
		return new Checks(checks);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	noop() {}
}
