import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { LazyGenerator } from '.';
import { ArrayGenerator } from '../array';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create a lazy type', () => {
	const transform = new ConstrainedTransformer().extend([
		LazyGenerator,
		StringGenerator,
		ObjectGenerator,
		ArrayGenerator,
	]);

	test('should handle recursive schemas', () => {
		const baseCategorySchema = z.object({
			name: z.string(),
		});

		type Category = z.infer<typeof baseCategorySchema> & {
			subcategories: Category[];
		};

		const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
			subcategories: z.lazy(() => categorySchema.array()),
		});

		expect(() => transform.fromSchema(categorySchema)).not.toThrowError();
		expect(transform.fromSchema(categorySchema)).toMatchInlineSnapshot(`
			{
			  "name": "nqypkamrvcwbasg",
			  "subcategories": [
			    {
			      "name": "pieit-nuhlrghez",
			      "subcategories": [
			        {
			          "name": "lrcthqxrfsogtdx",
			        },
			        {
			          "name": "agkbtrdoeqmftdy",
			        },
			        {
			          "name": "vliwuslzsvnuzjc",
			        },
			      ],
			    },
			    {
			      "name": "ycofjjjoqqnugmh",
			    },
			    {
			      "name": "nxgqrmammw-nvbz",
			    },
			  ],
			}
		`);
	});
});
