import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { EnumGenerator, NativeEnumGenerator } from '.';

describe('create enums', () => {
	const transform = new ConstrainedTransformer().extend([
		EnumGenerator,
		NativeEnumGenerator,
	]);

	test('produces a valid enum', () => {
		expect(transform).toReasonablySatisfy(z.enum(['Salmon', 'Tuna', 'Trout']));
	});

	test('using zod enums creates an enum and returns a random value', () => {
		expect(transform.fromSchema(z.enum(['Salmon', 'Tuna', 'Trout']))).toMatch(
			/^Salmon|Tuna|Trout$/,
		);
	});

	test('using numeric native enums creates an enum and returns a random value', () => {
		enum Fruits {
			Apple,
			Banana,
		}

		const value = transform.fromSchema(z.nativeEnum(Fruits));
		expect(typeof value).toBe('number');
		expect((value as number).toString()).toMatch(/^0|1/);
	});

	test('using string native enums creates an enum and returns a random value', () => {
		enum Fruits {
			Apple = 'apple',
			Banana = 'banana',
			Cantaloupe = 3, // you can mix numerical and string enums
		}

		expect(
			(
				transform.fromSchema(z.nativeEnum(Fruits)) as string | number
			).toString(),
		).toMatch(/^apple|banana|3$/);
	});

	test('using const native enums creates an enum and returns a random value', () => {
		const Fruits = {
			Apple: 'apple',
			Banana: 'banana',
			Cantaloupe: 3,
		} as const;

		expect(
			(
				transform.fromSchema(z.nativeEnum(Fruits)) as string | number
			).toString(),
		).toMatch(/^apple|banana|3$/);
	});
});
