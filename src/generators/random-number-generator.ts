import type { Condition } from '../context';

const default_min = 1;
const default_max = 500;
export function generateRandomNumber({
	min = default_min,
	max = default_max,
}: Condition = {}): number {
	let correctedMax = max;
	let correctedMin = min;
	if (min > max && max === default_max) {
		correctedMax = min + default_max;
	}
	if (min > correctedMax && min === default_min) {
		correctedMin = correctedMax - default_max;
	}
	return Math.floor(
		Math.random() * (correctedMax - correctedMin + 1) + correctedMin,
	);
}
