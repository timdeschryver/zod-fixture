import type { Condition } from '../context';
import { generateRandomNumber } from './random-number-generator';

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

export function generateRandomDate({
	min = default_min,
	max = default_max,
}: Condition): Date {
	let correctedMax = max;
	let correctedMin = min;
	if (min > max && max === default_max) {
		correctedMax = min + two_years;
	}
	if (min > correctedMax && min === default_min) {
		correctedMin = correctedMax - two_years;
	}
	return new Date(
		generateRandomNumber({ min: correctedMin, max: correctedMax }),
	);
}
