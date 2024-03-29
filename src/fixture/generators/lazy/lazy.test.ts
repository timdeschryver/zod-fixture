import { ConstrainedTransformer } from '@/transformer/transformer';
import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { LazyGenerator } from '.';
import { ArrayGenerator } from '../array';
import { NullableGenerator } from '../nullable';
import { ObjectGenerator } from '../object';
import { StringGenerator } from '../string';

describe('create a lazy type', () => {
	const transform = new ConstrainedTransformer({ seed: 1 }).extend([
		LazyGenerator,
		StringGenerator,
		ObjectGenerator,
		ArrayGenerator,
		NullableGenerator,
	]);

	test('should handle recursive schemas', () => {
		const baseCategorySchema = z.object({
			name: z.string(),
		});

		type Category = z.infer<typeof baseCategorySchema> & {
			subcategories?: Category[] | null;
		};

		const categorySchema: z.ZodType<Category> = baseCategorySchema.extend({
			subcategories: z.lazy(() => categorySchema.array()).nullable(),
		});

		expect(() => transform.fromSchema(categorySchema)).not.toThrowError();
		expect(transform.fromSchema(categorySchema)).toMatchInlineSnapshot(`
			{
			  "name": "-tzadi-dgckfkjs",
			  "subcategories": [
			    {
			      "name": "lisoflxgaosylmp",
			      "subcategories": [
			        {
			          "name": "vvt-vicsnxxywcw",
			          "subcategories": null,
			        },
			        {
			          "name": "bxscqlszlofshid",
			          "subcategories": null,
			        },
			        {
			          "name": "wlaauq-ruihmvfc",
			          "subcategories": null,
			        },
			      ],
			    },
			    {
			      "name": "ychyhddoacsyfyh",
			      "subcategories": null,
			    },
			    {
			      "name": "bppqdzphsgcolzs",
			      "subcategories": null,
			    },
			  ],
			}
		`);
	});
});
