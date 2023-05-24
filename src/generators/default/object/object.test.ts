import { Core } from '@/core/core';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { ObjectGenerator, RecordGenerator } from '.';
import { NumberGenerator } from '../number';
import { StringGenerator } from '../string';

describe('create objects', () => {
	const core = new Core().register([ObjectGenerator, StringGenerator, NumberGenerator]);

	test('creates an empty object', () => {
		expect(core.generate(z.object({}), { path: [] })).toBeTypeOf('object');
	});

	test('creates an object', () => {
		const input = z.object({
			str: z.string(),
			num: z.number(),
		});

		type I = z.infer<typeof input>;

		const result = core.generate(input, { path: [] });

		expect(result).toBeTypeOf('object');
		expect((result as I).str).toBeTypeOf('string');
		expect((result as I).num).toBeTypeOf('number');
	});

	test('creates a nested object', () => {
		const input = z.object({
			str: z.string(),
			nested: z.object({
				num: z.number(),
				str: z.string(),
			}),
		});

		type I = z.infer<typeof input>;

		const result = core.generate(input, { path: [] });
		expect(result).toBeTypeOf('object');
		expect((result as I).str).toBeTypeOf('string');
		expect((result as I).nested.num).toBeTypeOf('number');
	});

	test("creates an object with zod's api", () => {
		const BaseTeacher = z.object({ name: z.string() });
		const HasID = z.object({ id: z.string() });
		const Teacher = BaseTeacher.merge(HasID);

		type BaseTeacher = z.infer<typeof BaseTeacher>;
		type HasID = z.infer<typeof HasID>;

		const result = core.generate(Teacher, { path: [] });
		expect(result).toBeTypeOf('object');
		expect((result as HasID).id).toBeTypeOf('string');
		expect((result as BaseTeacher).name).toBeTypeOf('string');
	});

	test('creates an object with additional keys for passthrough', () => {
		const input = z.object({
			str: z.string(),
			num: z.number(),
		}).passthrough();

		type I = z.infer<typeof input>;

		const result = core.generate(input, { path: [] });

		expect(result).toBeTypeOf('object');
		expect((result as I).str).toBeTypeOf('string');
		expect((result as I).num).toBeTypeOf('number');
		expect(Object.keys((result as I)).length).toBeGreaterThan(2);
	})
});

describe('create Records', () => {
	const core = new Core().register([RecordGenerator, StringGenerator, NumberGenerator]);

	test('creates a record with 3 entries', () => {
		const input = z.record(z.number());
		const result = core.generate(input, { path: [] });

		type I = z.infer<typeof input>;

		expect(Object.keys(result as I)).toHaveLength(3);
		expect(Object.keys(result as I)[0]).toBeTypeOf('string');
		expect(Object.values(result as I)[0]).toBeTypeOf('number');
	});

	test('creates a record with a defined key type', () => {
		const input = z.record(z.string(), z.string());
		const result = core.generate(input, { path: [] });

		type I = z.infer<typeof input>;

		expect(Object.keys(result as I)[0]).toBeTypeOf('string');
		expect(Object.values(result as I)[0]).toBeTypeOf('string');
	});
});
