import { Generator } from '@/core/generator';
import { ZodEnum, ZodNativeEnum } from 'zod';

export const EnumGenerator = Generator({
	schema: ZodEnum,
	output: ({ def, core }) => core.utils.randomFrom(def.values),
});

export const NativeEnumGenerator = Generator({
	schema: ZodNativeEnum,
	output: ({ def, core }) => {
		const enumerable = def.values ?? {};

		const values = Object.keys(enumerable)
			.filter(key => Number.isNaN(Number(key)))
			.map(key => enumerable[key]);

		return core.utils.randomFrom(values);
	},
});
