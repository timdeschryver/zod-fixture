import type { Customization } from './customization';
import { numberRandomizer } from './number-randomize-customization';

const now = new Date();
const default_min = new Date(
	now.getUTCFullYear() - 2,
	now.getUTCMonth(),
	now.getUTCDate(),
).getTime();
const default_max = new Date(
	now.getUTCFullYear() + 2,
	now.getUTCMonth(),
	now.getUTCDate(),
).getTime();
const one_year = 31536000000;
const two_years = one_year * 2;

export const dateRandomizeCustomization = (
	min = default_min,
	max = default_max,
): Customization => {
	if (min > max) {
		throw new Error(`min ${min} can't be greater max ${max}`);
	}

	return {
		condition: ({ type, checks = {} }) =>
			type === 'date' &&
			checks['min'] === undefined &&
			checks['max'] === undefined,
		generator: (): Date => {
			return new Date(numberRandomizer(min, max));
		},
	};
};

export const dateRandomizeZodSchemaCustomization = (): Customization => {
	return {
		condition: ({ type, checks = {} }) =>
			type === 'date' &&
			(checks['min'] !== undefined || checks['max'] !== undefined),
		generator: ({ checks = {} }): Date => {
			const min = checks['min'];
			const max = checks['max'];

			if (min > max) {
				throw new Error(`min ${min} can't be greater max ${max}`);
			}

			const correctedMax = max ?? min + two_years;
			const correctedMin = min ?? correctedMax - two_years;
			return new Date(numberRandomizer(correctedMin, correctedMax));
		},
	};
};
