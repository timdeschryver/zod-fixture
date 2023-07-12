import { init as Cuid2 } from '@paralleldrive/cuid2';
import type { Defaults } from '../defaults';
import MersenneTwister from './MersenneTwister';

const LOREM =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const PARAGRAPHS = [LOREM];
const SENTENCES = LOREM.replace(/\. /g, '.\n').split('\n');
const WORDS = LOREM.toLowerCase().replace(/[,.]/, '').split(' ');

export class Randomization {
	mt: MersenneTwister;
	cuid2: () => string;

	constructor(private defaults: Defaults) {
		this.mt = new MersenneTwister(defaults.seed);
		this.cuid2 = Cuid2({ random: this.unitInterval.bind(this) });
	}

	uuid() {
		let u = '';
		const m = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
		let i = 0;
		let rb = (this.unitInterval() * 0xffffffff) | 0;
		while (i++ < 36) {
			const c = m[i - 1],
				r = rb & 0xf,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			u += c == '-' || c == '4' ? c : v.toString(16);
			rb = i % 8 == 0 ? (this.unitInterval() * 0xffffffff) | 0 : rb >> 4;
		}
		return u;
	}

	// https://en.wikipedia.org/wiki/Unit_interval
	unitInterval() {
		return this.mt.random();
	}

	from<T>(list: T[] | readonly T[] | Set<T> | string): T {
		const options = list instanceof Set ? [...list] : list;

		const min = 0;
		const max = Math.max(min, options.length - 1);
		const target = this.int({ min, max });

		return options[target] as T;
	}

	shuffle<T>(values: T[]): T[] {
		const copy: (T | undefined)[] = [...values];

		for (let i = copy.length - 1; i > 0; i--) {
			const j = this.int({ min: 0, max: i });
			const temp = copy[i];
			copy[i] = copy[j];
			copy[j] = temp;
		}

		return copy as T[];
	}

	string(config: { min?: number; max?: number }) {
		let min = config.min ?? this.defaults.string.min;
		let max = config.max ?? this.defaults.string.max;

		if (min < 0)
			throw new Error(
				`Minimum length of a string can't be less than 0: ${min}`
			);

		if (config.min && !config.max) max = config.min;
		if (config.max && !config.min) min = config.max;

		const length = this.int({ min, max });

		let result = '';
		for (let i = 0; i < length; i++) {
			result += this.from(this.defaults.string.characterSet);
		}

		return result;
	}

	float(config?: { min?: number; max?: number }): number {
		const min = config?.min ?? this.defaults.float.min;
		const max = config?.max ?? this.defaults.float.max;

		if (min > max) {
			throw new Error(`min ${min} can't be greater than max ${max}`);
		}

		return this.unitInterval() * (max - min) + min;
	}

	int(config?: { min?: number; max?: number }): number {
		const min = config?.min ?? this.defaults.int.min;
		const max = config?.max ?? this.defaults.int.max;

		if (min > max) {
			throw new Error(`min ${min} can't be greater than max ${max}`);
		}

		return Math.floor(this.unitInterval() * (max - min + 1)) + min;
	}

	bigInt(config?: { min?: bigint; max?: bigint }): bigint {
		const min = config?.min ?? this.defaults.bigint.min;
		const max = config?.max ?? this.defaults.bigint.max;

		if (min >= max) {
			throw new Error(`min ${min} can't be greater than max ${max}`);
		}

		const difference = max - min;
		const differenceLength = difference.toString().length;
		let multiplier = '';
		while (multiplier.length < differenceLength) {
			multiplier += this.unitInterval().toString().split('.')[1];
		}
		multiplier = multiplier.slice(0, differenceLength);
		const divisor = '1' + '0'.repeat(differenceLength);

		const randomDifference =
			(difference * BigInt(multiplier)) / BigInt(divisor);

		return min + randomDifference;
	}

	lorem(length: number, type: 'word' | 'sentence' | 'paragraph' = 'word') {
		const target =
			type === 'word' ? WORDS : type === 'sentence' ? SENTENCES : PARAGRAPHS;

		return Array.from({ length }, () => this.from(target)).join(' ');
	}

	date(config?: { min?: number; max?: number }): Date {
		const min = config?.min ?? this.defaults.date.min;
		const max = config?.max ?? this.defaults.date.max;

		if (min > max) {
			throw new Error(`min ${min} can't be greater than max ${max}`);
		}

		return new Date(this.int({ min, max }));
	}
}
