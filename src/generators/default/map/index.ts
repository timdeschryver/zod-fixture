import { Generator } from '@/core/generator';
import type { z } from 'zod';
import { ZodMap } from 'zod';

export const MapGenerator = Generator({
	schema: ZodMap,
	matches: () => true,
	output: ({ def, core, ctx }) => {
		const key = def.keyType;
		const value = def.valueType;

		const map = new Map<z.infer<typeof key>, z.infer<typeof value>>();

		core.utils.n(() => {
			const k = core.generate(key, ctx) as string | number;
			const v = core.generate(value, { path: [...ctx.path, k] });

			map.set(k, v);
		}, core.defaults.map);

		return map;
	},
});
