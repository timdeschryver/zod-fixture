import { Generator } from '@/transformer/generator';
import { ZodNumber } from 'zod';

export const NumberGenerator = Generator({
	schema: ZodNumber,
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks);

		const min = checks.find('min')?.value ?? transform.defaults.float.min;
		const max = checks.find('max')?.value ?? transform.defaults.float.max;

		const multipleOf = checks.find('multipleOf')?.value;
		const isInt = checks.has('int');
		const isFinite = checks.has('finite');

		let result = isInt
			? transform.utils.random.int({ min, max })
			: transform.utils.random.float({ min, max });

		if (multipleOf !== undefined) {
			result = Math.round(result / multipleOf) * multipleOf;

			if (result < min) {
				result += multipleOf;
			}
			if (result > max) {
				result -= multipleOf;
			}

			if (multipleOf % 1 !== 0) {
				const decimals = multipleOf.toString().split('.')[1]?.length;
				result = Number(result.toFixed(decimals));
			}
		}

		if (isFinite) {
			if (result === Infinity) {
				result = Number.MAX_VALUE;
			} else if (result === -Infinity) {
				result = Number.MIN_VALUE;
			}
		}

		return result;
	},
});
