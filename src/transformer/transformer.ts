import type { ZodTypeAny } from 'zod';
import type { Context, Definition } from './generator';
import { ZOD_INSTANCE_IDENTIFIER, isZodConstructor } from './generator';
import { Utils } from './utils';
import defaults from './utils/defaults';

export interface Config extends ZodFixture.TransformerConfig {
	seed?: number;
	defaults?: Partial<typeof defaults>;
}

export class Transformer {
	// @TODO We want this to be private
	// but also extensible. 😕
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	generators: Definition<any>[];

	readonly seed: number;
	readonly defaults: typeof defaults;
	readonly utils: Utils;

	constructor(config?: Config) {
		this.defaults = { ...defaults, ...config?.defaults };
		// Copied from defaults in MersenneTwister.
		// We could allow MersenneTwister to do this for us but then we
		// wouldn't have a reference to know what number was chosen.
		this.seed = config?.seed ?? Math.floor(Math.random() * Math.pow(10, 13));
		this.utils = new Utils(this);
		this.generators = [];
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extend(generators: Definition<any> | Definition<any>[]) {
		const input = Array.isArray(generators) ? generators : [generators];
		this.generators = input.concat(this.generators);
		return this;
	}

	fromSchema<TSchema extends ZodTypeAny>(
		schema: TSchema,
		context: Context = { path: [] }
	): unknown {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const transform = this;
		const def = schema._def;
		const generator = this.generators.find((generator) => {
			const generaterType = isZodConstructor(generator.schema)
				? generator.schema.name
				: generator.schema._def.typeName;

			if (def.typeName !== generaterType) {
				return false;
			}

			// If our generator was created with an instance, make sure it matches
			// the schema we're trying to generate.
			// This is particularly important for z.custom schemas.
			if (generator.schema[ZOD_INSTANCE_IDENTIFIER] !== undefined) {
				if (
					schema[ZOD_INSTANCE_IDENTIFIER] !==
					generator.schema[ZOD_INSTANCE_IDENTIFIER]
				)
					return false;
			}

			if (
				generator.filter &&
				!generator.filter({ schema, def, transform, context })
			) {
				return false;
			}

			return true;
		});

		this.shouldHaveMatch(schema, generator);

		return generator.output({ schema, def, transform, context });
	}

	shouldHaveMatch(
		schema: ZodTypeAny,
		generator: unknown
	): asserts generator is NonNullable<unknown> {
		if (!generator) throw this.missingGeneratorError(schema);
	}

	missingGeneratorError(schema: ZodTypeAny) {
		return new Error(`No generator found for ${schema.constructor.name}.`);
	}
}
