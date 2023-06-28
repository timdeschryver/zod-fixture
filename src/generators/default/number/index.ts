import { Generator } from '@/core/generator';
import { ZodNumber } from 'zod';

export const NumberGenerator = Generator({
	schema: ZodNumber,
	output: ({ def, core }) => {
		const checks = core.utils.checks(def.checks);

		const min = checks.find('min')?.value ?? core.defaults.float.min;
		const max = checks.find('max')?.value ?? core.defaults.float.max;

		const multipleOf = checks.find('multipleOf')?.value;
		const isInt = checks.has('int');
		const isFinite = checks.has('finite');

		let result = isInt
			? core.utils.random.int({ min, max })
			: core.utils.random.float({ min, max });

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
