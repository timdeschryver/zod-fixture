import { Transformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { EnumGenerator, NativeEnumGenerator } from '.';

describe('create enums', () => {
	const transform = new Transformer().extend([
		EnumGenerator,
		NativeEnumGenerator,
	]);

	test('produces a valid enum', () => {
		expect(transform).toProduce(z.enum(['Salmon', 'Tuna', 'Trout']));
	});

	test('using zod enums creates an enum and returns a random value', () => {
		expect(transform.from(z.enum(['Salmon', 'Tuna', 'Trout']))).toMatch(
			/^Salmon|Tuna|Trout$/
		);
	});

	test('using numeric native enums creates an enum and returns a random value', () => {
		enum Fruits {
			Apple,
			Banana,
		}

		expect(transform.from(z.nativeEnum(Fruits))).toMatch(/^0|1/);
	});

	test('using string native enums creates an enum and returns a random value', () => {
		enum Fruits {
			Apple = 'apple',
			Banana = 'banana',
			Cantaloupe = 3, // you can mix numerical and string enums
		}

		expect(transform.from(z.nativeEnum(Fruits))).toMatch(/^apple|banana|3$/);
	});

	test('using const native enums creates an enum and returns a random value', () => {
		const Fruits = {
			Apple: 'apple',
			Banana: 'banana',
			Cantaloupe: 3,
		} as const;

		expect(transform.from(z.nativeEnum(Fruits))).toMatch(/^apple|banana|3$/);
	});
});
