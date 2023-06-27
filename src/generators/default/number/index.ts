import { Generator } from '@/core/generator';
import { ZodNumber } from 'zod';

export const NumberGenerator = Generator({
	schema: ZodNumber,
	output: ({ def, core }) => {
		const { checks } = def;
		const { filter } = core.utils;

		const min = filter.checks(checks, 'min')?.value ?? core.defaults.float.min;
		const max = filter.checks(checks, 'max')?.value ?? core.defaults.float.max;

		const multipleOf = filter.checks(checks, 'multipleOf')?.value;
		const isInt = filter.checks(checks, 'int') !== undefined;
		const isFinite = filter.checks(checks, 'finite') !== undefined;

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
