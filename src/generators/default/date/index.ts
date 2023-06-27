import { Generator } from '@/core/generator';
import { ZodDate } from 'zod';

export const DateGenerator = Generator({
	schema: ZodDate,
	output: ({ def, core }) => {
		const { checks } = def;
		const { filter } = core.utils;

		const min =
			filter.checks(checks, 'min')?.value ?? core.defaults.date.min.getTime();
		const max =
			filter.checks(checks, 'max')?.value ?? core.defaults.date.max.getTime();

		return new Date(core.utils.random.int({ min, max }));
	},
});
