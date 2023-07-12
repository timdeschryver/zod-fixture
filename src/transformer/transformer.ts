import type { ZodTypeAny } from 'zod';
import type { Defaults } from './defaults';
import { constrained, unconstrained } from './defaults';
import type { Definition } from './generator';
import { Runner } from './runner';

export abstract class Transformer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract readonly generators: Definition<any>[];
	abstract readonly transformerConfig: Defaults;

	constructor(readonly userConfig?: Partial<Defaults>) {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extend(generators: Definition<any> | Definition<any>[]) {
		const input = Array.isArray(generators) ? generators : [generators];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore     We're allowed to update this internally
		this.generators = input.concat(this.generators);
		return this;
	}

	fromSchema<TSchema extends ZodTypeAny>(
		schema: TSchema,
		userDefaults?: Partial<Defaults>
	): unknown {
		return new Runner(this, userDefaults).fromSchema(schema);
	}

	missingGeneratorError(schema: ZodTypeAny) {
		return new Error(`No generator found for ${schema.constructor.name}.`);
	}
}

export class ConstrainedTransformer extends Transformer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	generators: Definition<any>[] = [];
	transformerConfig: Defaults = constrained;
}

export class UnconstrainedTransformer extends Transformer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	generators: Definition<any>[] = [];
	transformerConfig: Defaults = unconstrained;
}
