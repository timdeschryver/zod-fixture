import { Generator } from '@/transformer/generator';
import { ZodEnum, ZodNativeEnum } from 'zod';

export const EnumGenerator = Generator({
	schema: ZodEnum,
	output: ({ def, transform }) => transform.utils.random.from(def.values),
});

export const NativeEnumGenerator = Generator({
	schema: ZodNativeEnum,
	output: ({ def, transform }) => {
		const enumerable = def.values ?? {};

		const values = Object.keys(enumerable)
			.filter((key) => Number.isNaN(Number(key)))
			.map((key) => enumerable[key]);

		return transform.utils.random.from(values);
	},
});
