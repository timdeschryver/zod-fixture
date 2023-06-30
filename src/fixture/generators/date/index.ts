import { Generator } from '@/transformer/generator';
import { ZodDate } from 'zod';

export const DateGenerator = Generator({
	schema: ZodDate,
	output: ({ def, core }) => {
		const checks = core.utils.checks(def.checks);

		const min = checks.find('min')?.value ?? core.defaults.date.min;
		const max = checks.find('max')?.value ?? core.defaults.date.max;

		return new Date(core.utils.random.int({ min, max }));
	},
});
