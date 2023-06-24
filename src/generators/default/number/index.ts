import { Generator } from '@/core/generator';
import { ZodNumber } from 'zod';

export const NumberGenerator = Generator({
	schema: ZodNumber,
	output: ({ def, core }) => {
		const { checks } = def;
		const { filterChecks } = core.utils;

		let min = filterChecks(checks, 'min')?.value ?? core.defaults.float.min;
		let max = filterChecks(checks, 'max')?.value ?? core.defaults.float.max;

		const multipleOf = filterChecks(checks, 'multipleOf')?.value;
		const isInt = filterChecks(checks, 'int') !== undefined;
		const isFinite = filterChecks(checks, 'finite') !== undefined;

		if (multipleOf !== undefined) {
			min = min / multipleOf;
			max = max / multipleOf;
		}

		let result = isInt
			? core.utils.randomInt({ min, max })
			: core.utils.randomFloat({ min, max });

		if (multipleOf !== undefined) {
			result = result * multipleOf;
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
