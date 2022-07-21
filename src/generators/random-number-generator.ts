export function generateRandomNumber(min = 1, max = 500): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
