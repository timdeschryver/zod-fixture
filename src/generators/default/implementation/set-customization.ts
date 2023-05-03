import type { Customization } from './customization';

export const setCustomization = (): Customization<{
	length: number;
	create: () => unknown;
}> => {
	return {
		condition: ({ type }) => type === 'set',
		generator: ({ length = 3, create }): Set<unknown> => {
			if (length < 0) {
				throw new Error(`length ${length} must be greater or equal to 0`);
			}

			const set = new Set<unknown>();
			while (set.size < length) {
				set.add(create());
			}
			return set;
		},
	};
};
