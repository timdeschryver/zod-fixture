import { expect, test } from 'vitest';
// #region example
import { z } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

// Your custom type
const pxSchema = z.custom<`${number}px`>((val) => {
	return /^\d+px$/.test(val as string);
});

// Your custom generator
const PixelGenerator = Generator({
	schema: pxSchema,
	output: () => '100px',
});

// Example
const resolutionSchema = z.object({
	width: pxSchema,
	height: pxSchema,
});

const fixture = new Fixture().extend([PixelGenerator]);
const resolution = fixture.fromSchema(resolutionSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		width: '100px',
		height: '100px',
	}
	// #endregion output
);

test('generates a resolution', () => {
	expect(resolution).toMatchInlineSnapshot(`
		{
		  "height": "100px",
		  "width": "100px",
		}
	`);
	expect(resolution).toEqual(output);
});
