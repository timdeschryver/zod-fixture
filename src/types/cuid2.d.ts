declare module '@paralleldrive/cuid2' {
	export function init(config: { random: () => number }): () => string;
	export function isCuid(input: string): boolean;
}
