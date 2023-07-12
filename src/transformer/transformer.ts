import type { ZodTypeAny } from 'zod';
import type { Defaults } from './defaults';
import { constrained } from './defaults';
import type { Definition } from './generator';
import { Runner } from './runner';

export class Transformer {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly generators: Definition<any>[] = [];
	readonly defaults: Defaults = constrained;

	constructor(userDefaults?: Partial<Defaults>) {
		// @TODO: Change to deep extend
		this.defaults = { ...this.defaults, ...userDefaults };
	}

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
