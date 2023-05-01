import type { Customization } from './customization';
import type { Effect } from 'zod';

type EffectContext<T> = {
	effect: Effect<T>;
	inner: {
		path: string[];
		type: string;
		create: () => T;
	};
};

export const effectCustomization = (): Customization<
	EffectContext<unknown>
> => {
	return {
		condition: ({ type }) => type === 'effect',
		generator,
	};
};

function generator<T>({ effect, inner }: EffectContext<T>): T {
	if (effect.type === 'transform') {
		const output = effect.transform(inner.create(), {
			addIssue: () => {
				/* noop */
			},
			path: inner.path,
		});
		return output;
	}

	return inner.create();
}
