import { ZodDate } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const DateGenerator = Generator({
	schema: ZodDate,
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks);

		const min = checks.find('min')?.value ?? transform.defaults.date.min;
		const max = checks.find('max')?.value ?? transform.defaults.date.max;

		return new Date(transform.utils.random.int({ min, max }));
	},
});
