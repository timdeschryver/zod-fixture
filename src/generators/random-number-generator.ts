export function generateRandomNumber(
	min = 1,
	max = Number.MAX_SAFE_INTEGER,
): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
