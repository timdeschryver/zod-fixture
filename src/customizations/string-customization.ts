import type { Customization } from './customization';
import { createId } from '@paralleldrive/cuid2';
import cuid from 'cuid';

export const stringCustomization = (): Customization => {
	return {
		condition: ({ type }) => type === 'string',
		generator: ({ propertName, checks = {} }): string => {
			if(checks['uuid']) {
				return uuid();
			}

			if(checks['cuid']) {
				return cuid();
			}

			if(checks['cuid2']) {
				return createId();
			}

			if(checks['email']) {
				return `${generateString(propertName).slice(0, 8)}@fixture.com`;
			}

			if(checks['startsWith'] || checks['endsWith']) {
				return [checks['startsWith'], generateString(propertName), checks['endsWith']].filter(Boolean).join('')
			}

			if(checks['min'] !== undefined || checks['max'] !== undefined) {
				return generateStringWithLength(propertName, checks['min'], checks['max']);
			}

			return generateString(propertName);
		},
	};
};


function generateStringWithLength(propertName?: string, minLength?: number, maxLength?: number): string {
	if (minLength !== undefined && minLength < 0) {
		throw new Error(`minLength ${minLength} can't be less than 0`);
	}

	let result = generateString(propertName);
	while (result.length < (minLength ?? result.length)) {
		result += `-${uuid()}`;
	}

	if (result.length > (maxLength ?? result.length)) {
		result = result.substring(0, maxLength);
	}
	return result;
}

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
