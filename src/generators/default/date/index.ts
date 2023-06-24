import { Generator } from '@/core/generator';
import { ZodDate } from 'zod';

export const DateGenerator = Generator({
	schema: ZodDate,
	matches: () => true,
	output: ({ def, core }) => {
		const min = core.utils.filter.checks(def.checks, 'min')?.value;
		const max = core.utils.filter.checks(def.checks, 'max')?.value;

		return new Date(core.utils.random.int({ min, max }));
	},
});
