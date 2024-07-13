import type { ZodTypeAny } from 'zod';
import { z } from 'zod';
import { Generator } from '@/transformer/generator';

export const EnumGenerator = Generator({
	schema: z.enum(['']),
	output: ({ def, transform }) => transform.utils.random.from(def.values),
});

export const NativeEnumGenerator = Generator({
	schema: z.nativeEnum({}),
	output: ({ def, transform }) => {
		const enumerable: { [key: string]: ZodTypeAny } = def.values ?? {};

		const values = Object.keys(enumerable)
			.filter((key) => Number.isNaN(Number(key)))
			.map((key) => enumerable[key]);

		return transform.utils.random.from(values);
	},
});
