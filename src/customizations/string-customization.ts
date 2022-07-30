import type { Customization } from './customization';

export const stringCustomization = (): Customization => {
	return {
		condition: ({ type, checks = {} }) =>
			type === 'string' &&
			checks['min'] == undefined &&
			checks['max'] === undefined,
		generator: ({ propertName }): string => {
			return generateString(propertName);
		},
	};
};

export const stringZodSchemaCustomization = (): Customization => {
	return {
		condition: ({ type, checks = {} }) =>
			type === 'string' &&
			(checks['min'] !== undefined || checks['max'] !== undefined),
		generator: ({ propertName, checks = {} }): string => {
			const minLength = checks['min'];
			const maxLength = checks['max'];

			if (minLength < 0) {
				throw new Error(`minLength ${minLength} can't be less than 0`);
			}

			let result = generateString(propertName);
			while (result.length < minLength ?? result.length) {
				result += `-${uuid()}`;
			}

			if (result.length > maxLength ?? result.length) {
				result = result.substring(0, maxLength);
			}
			return result;
		},
	};
};

function generateString(prefix?: string): string {
	return `${prefix ? `${prefix}-` : ''}${uuid()}`;
}

function uuid(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
