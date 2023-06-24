import { Generator } from '@/core/generator';
import { ZodDate } from 'zod';

export const DateGenerator = Generator({
	schema: ZodDate,
	output: ({ def, core }) => {
		const min = core.utils.filterChecks(def.checks, 'min')?.value;
		const max = core.utils.filterChecks(def.checks, 'max')?.value;

		return new Date(core.utils.randomInt({ min, max }));
	},
});
