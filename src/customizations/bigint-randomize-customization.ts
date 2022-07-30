import type { Customization } from './customization';

const default_min = 1;
const default_max = 500;

export const bigIntRandomizeCustomization = (
	min = default_min,
	max = default_max,
): Customization => {
	if (min > max) {
		throw new Error(`min ${min} can't be greater max ${max}`);
	}

	return {
		condition: ({ type, checks = {} }) =>
			type === 'bigint' &&
			checks['min'] === undefined &&
			checks['max'] === undefined,
		generator: (): bigint => bigIntRandomizer(min, max),
	};
};

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
