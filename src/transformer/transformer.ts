import type { ZodTypeAny } from '@/internal/zod';
import type { Defaults } from './defaults';
import { constrained, randomSeed, unconstrained } from './defaults';
import type { Definition } from './generator';
import { Runner } from './runner';

export abstract class Transformer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract readonly generators: Definition[];
	abstract readonly transformerDefaults: Defaults;

	constructor(readonly instanceDefaults?: Partial<Defaults>) {
		this.instanceDefaults = { seed: randomSeed(), ...instanceDefaults };
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extend(generators: Definition | Definition[]) {
		const input = Array.isArray(generators) ? generators : [generators];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore     We're allowed to update this internally
		this.generators = input.concat(this.generators);
		return this;
	}

	fromSchema<TSchema extends ZodTypeAny>(
		schema: TSchema,
		instanceDefaults?: Partial<Defaults>,
	): unknown {
		return new Runner(this, instanceDefaults).fromSchema(schema);
	}

	missingGeneratorError(schema: ZodTypeAny) {
		return new Error(`No generator found for ${schema.constructor.name}.`);
	}
}

export class ConstrainedTransformer extends Transformer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	generators: Definition[] = [];
	transformerDefaults: Defaults = constrained;
}

export class UnconstrainedTransformer extends Transformer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	generators: Definition[] = [];
	transformerDefaults: Defaults = unconstrained;
}
