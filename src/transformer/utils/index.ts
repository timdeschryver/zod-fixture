import type { ZodTypeAny } from 'zod';
import { ZodLazy } from 'zod';
import type { Runner } from '../runner';
import { Checks } from './Checks';
import { Randomization } from './Randomization';

export class Utils {
	recursion = new WeakMap<() => ZodTypeAny, number>();
	random: Randomization;

	constructor(private runner: Runner) {
		this.random = new Randomization(runner.defaults);
	}

	resolveValue<
		TInitial,
		TFallback extends NonNullable<TInitial>,
		TConflict extends NonNullable<TInitial>,
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
			  },
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
		config: number | { min: number; max: number } = this.runner.defaults.array,
	): Array<T> {
		const length =
			typeof config === 'number' ? config : this.random.int(config);

		return Array.from({ length }, (_, i) => factory(i));
	}

	ifNotNever<TSchema extends ZodTypeAny>(
		schema: TSchema | null | undefined,
		action: (schema: TSchema) => unknown,
	) {
		if (!schema || schema._def.typeName === 'ZodNever') return;
		action(schema);
	}

	recursionCheck<TSchema extends ZodTypeAny>(
		schema: TSchema,
		action: (schema: TSchema) => unknown,
	) {
		if (schema instanceof ZodLazy) {
			const count = this.recursion.get(schema._def.getter) ?? 0;
			const cap = this.random.int(this.runner.defaults.recursion);
			if (count >= cap) return;
		}
		action(schema);
	}

	isType<TSchema extends ZodTypeAny>(
		target: TSchema,
		schema: ZodTypeAny,
	): schema is TSchema {
		return target._def?.typeName === schema?._def?.typeName;
	}

	checks<TChecks extends { kind: string }[]>(checks: TChecks) {
		return new Checks(checks);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	noop() {}
}
