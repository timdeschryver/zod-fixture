import type { Context, Definition } from './generator';
import { ZOD_INSTANCE_IDENTIFIER, ZOD_TYPE_IDENTIFIER } from './generator';
import { Utils } from './utils';
import defaults from './utils/defaults';

export interface Config {
	seed?: number;
	defaults?: Partial<typeof defaults>;
}

export class Core {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	#generators: Definition<any>[] = [];

	readonly seed: number;
	readonly defaults = defaults;
	readonly utils = new Utils(this);

	constructor(config?: Config) {
		this.defaults = { ...this.defaults, ...config?.defaults };
		// Copied from defaults in MersenneTwister.
		// We could allow MersenneTwister to do this for us but then we
		// wouldn't have a reference to know what number was chosen.
		this.seed = config?.seed ?? Math.floor(Math.random() * Math.pow(10, 13));
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register(generators: Definition<any>[]) {
		this.#generators = generators.concat(this.#generators);
		return this;
	}

	generate(schema: Zod.ZodTypeAny, context: Context = { path: [] }): unknown {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const core = this;
		const def = schema._def;
		const generator = this.#generators.find((generator) => {
			if (
				schema[ZOD_TYPE_IDENTIFIER] !==
				generator.schema.prototype[ZOD_TYPE_IDENTIFIER]
			)
				return false;

			if (
				schema[ZOD_INSTANCE_IDENTIFIER] !==
				generator.schema[ZOD_INSTANCE_IDENTIFIER]
			)
				return false;

			if (!generator.matches({ schema, def, core, context })) return false;

			return true;
		});

		if (!generator)
			throw new Error(`No generator found for ${schema.constructor.name}`);

		return generator.output({ schema, def, core, context });
	}
}
