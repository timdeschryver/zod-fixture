import type { ZodTypeAny } from 'zod';
import type { Transformer } from '../transformer';
import { Checks } from './Checks';
import { Randomization } from './Randomization';

export class Utils {
	random: Randomization;

	constructor(private transform: Transformer) {
		this.random = new Randomization(transform.defaults, transform.seed);
	}

	n<T>(
		factory: (index: number) => T,
		config: number | { min: number; max: number } = this.transform.defaults
			.array
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

	checks<TChecks extends { kind: string }[]>(checks: TChecks) {
		return new Checks(checks);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	noop() {}
}
