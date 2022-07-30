import type { Customization } from './customization';

export const recordCustomization = (): Customization<{
	length: number;
	keyType: string;
	keyCreate: () => string | number | symbol;
	valueType: string;
	valueCreate: () => unknown;
}> => {
	return {
		condition: ({ type }) => type === 'record',
		generator: ({
			length = 3,
			keyCreate,
			valueCreate,
		}): Record<string | number | symbol, unknown> => {
			if (length < 0) {
				throw new Error(`length ${length} must be greater or equal to 0`);
			}

			return Array.from({ length }).reduce<
				Record<string | number | symbol, unknown>
			>(aggregate => {
				return {
					...aggregate,
					[keyCreate()]: valueCreate(),
				};
			}, {} as Record<string | number | symbol, unknown>);
		},
	};
};
