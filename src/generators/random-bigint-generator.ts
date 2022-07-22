import type { Condition } from '../context';
import { generateRandomNumber } from './random-number-generator';

export function generateRandomBigInt({
	min = 1,
	max = Number.MAX_SAFE_INTEGER,
}: Condition): bigint {
	return BigInt(generateRandomNumber({ min, max }));
}
