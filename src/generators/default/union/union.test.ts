import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { DiscriminatedUnionGenerator, UnionGenerator } from '.';
import { LiteralGenerator } from '../literal';
import { NumberGenerator } from '../number';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create unions', () => {
	const core = new Core().register([
		UnionGenerator,
		DiscriminatedUnionGenerator,
		ObjectGenerator,
		NumberGenerator,
		StringGenerator,
		LiteralGenerator,
	]);

	test('produces a valid union', () => {
		expect(core).toProduce(z.union([z.string(), z.number()]));
	});

	test('creates a union value', () => {
		expect(typeof core.generate(z.union([z.string(), z.number()]))).toMatch(
			/^string|number$/
		);
	});

	test('creates a union value with the or syntax', () => {
		expect(typeof core.generate(z.string().or(z.number()))).toMatch(
			/^string|number$/
		);
	});

	test('creates a discriminated union', () => {
		const input = z.discriminatedUnion('type', [
			z.object({ type: z.literal('a'), a: z.string() }),
			z.object({ type: z.literal('b'), b: z.string() }),
		]);
		const result = core.generate(input);

		type I = z.infer<typeof input>;

		expect((result as I).type).toBeTypeOf('string');
		expect((result as I).type).toMatch(/^a|b$/);
	});
});
