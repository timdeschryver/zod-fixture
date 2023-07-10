import { ZodNumber } from '@/internal/zod';
import { Generator } from '@/transformer/generator';

export const NumberGenerator = Generator({
	schema: ZodNumber,
	output: ({ def, transform }) => {
		const checks = transform.utils.checks(def.checks);

		const minCheck = checks.find('min') ?? {
			value: transform.defaults.float.min,
			inclusive: true,
		};
		const maxCheck = checks.find('max') ?? {
			value: transform.defaults.float.max,
			inclusive: true,
		};

		const min = minCheck.inclusive ? minCheck.value : minCheck.value + 1;
		const max = maxCheck.inclusive ? maxCheck.value : maxCheck.value - 1;

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
