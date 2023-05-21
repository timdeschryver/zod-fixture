import { Generator } from '@/core/generator';
import { ZodNumber } from 'zod';

export const NumberGenerator = Generator({
	schema: ZodNumber,
	matches: () => true,
	output: ({ def, core }) => {
		const { filterChecks } = core.utils;

		let min = filterChecks(def.checks, 'min')?.value ?? core.defaults.number.min;
		let max = filterChecks(def.checks, 'max')?.value ?? core.defaults.number.max;

		const multipleOf = filterChecks(def.checks, 'multipleOf')?.value;
		const isInt = filterChecks(def.checks, 'int') !== undefined;
		const isFinite = filterChecks(def.checks, 'finite') !== undefined;

		if (multipleOf !== undefined) {
			min = min / multipleOf;
			max = max / multipleOf;
		}

		let result = isInt
			? core.utils.randomInt({ min, max })
			: random({ min, max });

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

export function random(config?: { min?: number; max?: number }): number {
	const min = config?.min ?? Number.MIN_SAFE_INTEGER;
	const max = config?.max ?? Number.MAX_SAFE_INTEGER;

	if (min > max) {
		throw new Error(`min ${min} can't be greater than max ${max}`);
	}

	return Math.random() * (max - min + 1) + min;
}
