export function randomEnumValueGenerator(possibleValues: unknown[]): unknown {
	return possibleValues[Math.floor(Math.random() * possibleValues.length)];
}
