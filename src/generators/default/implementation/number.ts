import { ZodBigInt, ZodNumber, ZodNumberDef } from 'zod';
import { Generator } from '../../../core/generator';

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 500;

import type { Customization } from './customization';

export const BigIntGenerator = Generator({
	schema: ZodBigInt,
	test: () => true,
	output: ({ def }) => bigIntRandomizer(DEFAULT_MIN, DEFAULT_MAX),
});

// (
// 	min = default_min,
// 	max = default_max,
// ): Customization => {
// 	if (min > max) {
// 		throw new Error(`min ${min} can't be greater max ${max}`);
// 	}

// 	return {
// 		condition: ({ type, checks = {} }) =>
// 			type === 'bigint' &&
// 			checks['min'] === undefined &&
// 			checks['max'] === undefined,
// 		generator: (): bigint => bigIntRandomizer(min, max),
// 	};
// };

export const bigintRandomizeZodSchemaCustomization = (): Customization => {
	return {
		condition: ({ type, checks = {} }) =>
			type === 'bigint' &&
			(checks['min'] !== undefined || checks['max'] !== undefined),
		generator: ({ checks = {} }): bigint => {
			const min = checks['min'];
			const max = checks['max'];

			if (min > max) {
				throw new Error(`min ${min} can't be greater max ${max}`);
			}

			const correctedMax = max ?? min + default_max;
			const correctedMin = min ?? correctedMax - default_max;
			return bigIntRandomizer(correctedMin, correctedMax);
		},
	};
};

export function bigIntRandomizer(min: number, max: number): bigint {
	return BigInt(Math.floor(Math.random() * (max - min + 1) + min));
}
