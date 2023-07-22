import RandExp from 'randexp';

export class RegExCache {
	regex = new WeakMap<RegExp, RandExp>();
	string = new Map<string, RandExp>();

	has(pattern: string | RegExp) {
		return typeof pattern === 'string'
			? this.string.has(pattern)
			: this.regex.has(pattern);
	}

	set(pattern: string | RegExp, value: RandExp) {
		return typeof pattern === 'string'
			? this.string.set(pattern, value)
			: this.regex.set(pattern, value);
	}

	get(pattern: string | RegExp, factory?: (instance: RandExp) => RandExp) {
		let result =
			typeof pattern === 'string'
				? this.string.get(pattern)
				: this.regex.get(pattern);

		if (!result && factory) {
			result = factory(new RandExp(pattern));
			this.set(pattern, result);
		} else {
			throw new Error(`No value for ${pattern} and no fallback available.`);
		}

		return result;
	}
}
