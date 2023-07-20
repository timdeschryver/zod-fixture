import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { DiscriminatedUnionGenerator, UnionGenerator } from '.';
import { LiteralGenerator } from '../literal';
import { NumberGenerator } from '../number';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create unions', () => {
	const transform = new ConstrainedTransformer().extend([
		UnionGenerator,
		DiscriminatedUnionGenerator,
		ObjectGenerator,
		NumberGenerator,
		StringGenerator,
		LiteralGenerator,
	]);

	test('produces a valid union', () => {
		expect(transform).toReasonablySatisfy(z.union([z.string(), z.number()]));
	});

	test('creates a union value', () => {
		expect(
			typeof transform.fromSchema(z.union([z.string(), z.number()]))
		).toMatch(/^string|number$/);
	});

	test('creates a union value with the or syntax', () => {
		expect(typeof transform.fromSchema(z.string().or(z.number()))).toMatch(
			/^string|number$/
		);
	});

	test('produces a valid discriminated union', () => {
		const input = z.discriminatedUnion('type', [
			z.object({ type: z.literal('a'), a: z.string() }),
			z.object({ type: z.literal('b'), b: z.string() }),
		]);
		expect(transform).toReasonablySatisfy(input);
	});

	test('creates a discriminated union', () => {
		const input = z.discriminatedUnion('type', [
			z.object({ type: z.literal('a'), a: z.string() }),
			z.object({ type: z.literal('b'), b: z.string() }),
		]);
		const result = transform.fromSchema(input);

		type I = z.infer<typeof input>;

		expect((result as I).type).toBeTypeOf('string');
		expect((result as I).type).toMatch(/^a|b$/);
	});
});
