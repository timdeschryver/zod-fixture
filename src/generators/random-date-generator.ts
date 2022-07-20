import { generateRandomNumber } from './random-number-generator';

const now = new Date();
export function generateRandomDate(
	minDate = new Date(
		now.getUTCFullYear() - 2,
		now.getUTCMonth(),
		now.getUTCDate(),
	),
	maxDate = new Date(
		now.getUTCFullYear() + 2,
		now.getUTCMonth(),
		now.getUTCDate(),
	),
): Date {
	return new Date(generateRandomNumber(minDate.getTime(), maxDate.getTime()));
}
