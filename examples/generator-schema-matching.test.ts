import { expect, test } from 'vitest';
// #region example
import { z, ZodString } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

// this is a custom zod type
const pxSchema = z.custom<`${number}px`>((val) => {
	return /^\d+px$/.test(val as string);
});

const StringGenerator = Generator({
	schema: ZodString,
	output: () => 'John Doe',
});

const PixelGenerator = Generator({
	schema: pxSchema,
	output: () => '100px',
});

const DeveloperSchema = z.object({
	name: z.string().max(10),
	resolution: z.object({
		height: pxSchema,
		width: pxSchema,
	}),
});

const fixture = new Fixture({ seed: 7 }).extend([
	PixelGenerator,
	StringGenerator,
]);
const developer = fixture.fromSchema(DeveloperSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		name: 'John Doe',
		resolution: {
			height: '100px',
			width: '100px',
		},
	}
	// #endregion output
);

test('generates a person', () => {
	expect(developer).toMatchInlineSnapshot(`
		{
		  "name": "John Doe",
		  "resolution": {
		    "height": "100px",
		    "width": "100px",
		  },
		}
	`);
	expect(developer).toEqual(output);
});
