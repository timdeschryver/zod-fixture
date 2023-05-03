import type { Customization } from './customization';

export const mapCustomization = (): Customization<{
	length: number;
	keyType: string;
	keyCreate: () => string | number | symbol;
	valueType: string;
	valueCreate: () => unknown;
}> => {
	return {
		condition: ({ type }) => type === 'map',
		generator: ({
			length = 3,
			keyCreate,
			valueCreate,
		}): Map<unknown, unknown> => {
			if (length < 0) {
				throw new Error(`length ${length} must be greater or equal to 0`);
			}

			const map = new Map<unknown, unknown>();
			while (map.size < length) {
				map.set(keyCreate(), valueCreate());
			}
			return map;
		},
	};
};
