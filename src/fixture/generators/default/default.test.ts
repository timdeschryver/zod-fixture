import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { DefaultGenerator } from '.';
import { ArrayGenerator } from '../array';
import { StringGenerator } from '../string';

describe('create default', () => {
	const transform = new ConstrainedTransformer().extend([
		ArrayGenerator,
		DefaultGenerator,
		StringGenerator,
	]);

	const schema = z.string().default('test');

	test('alternates between boolean values', () => {
		const result = transform.fromSchema(schema.array(), {
			seed: 1,
			array: { min: 20, max: 20 },
		});

		expect(result).toStrictEqual([
			'zadi-dgckfkjskz',
			'test',
			'wlisoflxgaosylm',
			'test',
			'ldzfvvt-vicsnxx',
			'test',
			'wcwbhebxscqlszl',
			'test',
			'fshidsvwlaauq-r',
			'test',
			'ihmvfcbmmychyhd',
			'test',
			'oacsyfyhinpbppq',
			'test',
			'zphsgcolzsnlobu',
			'test',
			'brdnvzapxyodmdy',
			'test',
			'kkoerzjjpurtdxs',
			'test',
		]);
	});

	test('produce deterministic results', () => {
		expect(transform.fromSchema(schema, { seed: 1 })).toBe('tzadi-dgckfkjsk');
		expect(transform.fromSchema(schema, { seed: 2 })).toBe('azozlnliiefsqdi');
		expect(transform.fromSchema(schema, { seed: 3 })).toBe('test');
	});

	test('produces a valid fixture', () => {
		expect(transform).toReasonablySatisfy(schema);
	});
});
