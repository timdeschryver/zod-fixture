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

	test('produce deterministic results', () => {
		const result1 = transform.fromSchema(schema.array(), {
			seed: 1,
			array: { min: 20, max: 20 },
		});

		expect(result1).toStrictEqual([
			'zadi-dgckfkjskz',
			'lisoflxgaosylmp',
			'test',
			'test',
			'vvt-vicsnxxywcw',
			'test',
			'test',
			'test',
			'test',
			'cqlszlofshidsvw',
			'test',
			'test',
			'test',
			'-ruihmvfcbmmych',
			'ddoacsyfyhinpbp',
			'dzphsgcolzsnlob',
			'brdnvzapxyodmdy',
			'koerzjjpurtdxsq',
			'jjuhjyulx-arnqb',
			'test',
		]);

		const result2 = transform.fromSchema(schema.array(), {
			seed: 2,
			array: { min: 20, max: 20 },
		});

		expect(result2).toStrictEqual([
			'test',
			'test',
			'zlnliiefsqdinhr',
			'osdnnpetvgxonkw',
			'test',
			'test',
			'ibhldcednqpgfcu',
			'test',
			'emjfmrrnvnrkqv-',
			'eesx-nnfy-jipgl',
			'jumohzvovczjwwn',
			'test',
			'test',
			'test',
			'lbx-z-nvsqtumez',
			'test',
			'test',
			'jubz-tlnnxiohpk',
			'test',
			'taktajvfhjpxajr',
		]);
	});

	test('produces a valid fixture', () => {
		expect(transform).toReasonablySatisfy(schema);
	});
});
