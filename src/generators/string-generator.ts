import type { Condition, ConditionBasedGenerator } from '../context';

export function generateString(prefix = ''): ConditionBasedGenerator<string> {
	return ({ min, max }: Condition) => {
		if (min < 0) {
			throw new Error(`min ${min} can't be less than 0`);
		}

		let result = `${prefix ? `${prefix}-` : ''}-${uuid()}`;
		while (result.length < min ?? result.length) {
			result += `-${uuid()}`;
		}

		if (result.length > max ?? result.length) {
			result = result.substring(0, max);
		}
		return result;
	};
}

function uuid(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
