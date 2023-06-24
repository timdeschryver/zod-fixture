import type { Core } from '../core';
import { Randomization } from './Randomization';

export class Utils {
	random: Randomization;

	constructor(private core: Core) {
		this.random = new Randomization(core.defaults, core.seed);
	}

	n<T>(
		factory: (index: number) => T,
		config: number | { min: number; max: number } = this.core.defaults.array
	): Array<T> {
		const length =
			typeof config === 'number' ? config : this.random.int(config);

		return Array.from({ length }, (_, i) => factory(i));
	}

	filter = {
		checks<TChecks extends { kind: string }[], TKind extends string>(
			checks: TChecks,
			kind: TKind
		): Utils.FilterChecks<TChecks[number], TKind> | undefined {
			return checks.find((check) => check.kind === kind) as
				| Utils.FilterChecks<TChecks[number], TKind>
				| undefined;
		},
	};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	noop() {}
}
