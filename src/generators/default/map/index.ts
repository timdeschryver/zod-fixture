import { Generator } from '@/core/generator';
import type { z } from 'zod';
import { ZodMap } from 'zod';

export const MapGenerator = Generator({
	schema: ZodMap,
	test: () => true,
	output: ({ def, core }) => {
		const key = def.keyType;
		const value = def.valueType;

		const map = new Map<z.infer<typeof key>, z.infer<typeof value>>();

		core.utils.n((i) => {
			const k = core.generate(key);
			const v = core.generate(value);

			map.set(k, v);
		}, core.defaults.map);

		return map;
	},
});