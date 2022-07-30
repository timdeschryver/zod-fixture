import type { Customization } from './customization';

export const arrayWithLengthCustomization = (): Customization<{
	length: number;
	create: () => unknown;
}> => {
	return {
		condition: ({ type }) => type === 'array',
		generator: ({ length = 3, create }): unknown[] => {
			if (length < 0) {
				throw new Error(`length ${length} must be greater or equal to 0`);
			}

			return Array.from({ length }, () => create());
		},
	};
};
