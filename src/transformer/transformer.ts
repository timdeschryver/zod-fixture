import type { ZodTypeAny } from 'zod';
import type { Defaults } from './defaults';
import { constrained, unconstrained } from './defaults';
import type { Definition } from './generator';
import { Runner } from './runner';

export class Transformer {
	// @TODO We want this to be private
	// but also extensible. 😕
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	generators: Definition<any>[] = [];

	readonly defaults: Defaults;

	constructor(userDefaults?: Partial<Defaults>) {
		const defaults = userDefaults?.constrained ? constrained : unconstrained;
		// @TODO: Change to deep extend
		this.defaults = { ...defaults, ...userDefaults };
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extend(generators: Definition<any> | Definition<any>[]) {
		const input = Array.isArray(generators) ? generators : [generators];
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
