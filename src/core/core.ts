import defaults from './defaults';
import {
	Context,
	Definition,
	ZOD_INSTANCE_IDENTIFIER,
	ZOD_TYPE_IDENTIFIER,
} from './generator';
import { Utils } from './utils';

export interface Config {
	defaults?: Partial<typeof defaults>;
}

export class Core {
	readonly utils = new Utils(this);
	#defaults = defaults;
	#generators: Definition<any>[] = [];

	get defaults() {
		return this.#defaults;
	}

	constructor(config?: Config) {
		this.#defaults = { ...this.#defaults, ...config?.defaults };
	}

	register(generators: Definition<any>[]) {
		this.#generators = generators.concat(this.#generators);
		return this;
	}

	generate(schema: Zod.ZodTypeAny, ctx: Context = {}): unknown {
		const core = this;
		const def = schema._def;
		const generator = this.#generators.find(generator => {
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

			if (!generator.test({ schema, def, core })) return false;

			return true;
		});

		if (!generator)
			throw new Error(`No generator found for ${schema.constructor.name}`);
			
		return generator.output({ schema, def, core, ctx });
	}
}
