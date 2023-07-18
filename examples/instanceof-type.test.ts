import { expect, test } from 'vitest';
// #region example
import { z } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

class ExampleClass {
	id: number;
	constructor() {
		this.id = ExampleClass.uuid++;
	}
	static uuid = 1;
}

// Schema from instanceof (remember, this is just a z.custom)
const exampleSchema = z.instanceof(ExampleClass);

// Your custom generator
const ExampleGenerator = Generator({
	schema: exampleSchema,
	output: () => new ExampleClass(),
});

// Example
const listSchema = z.object({
	examples: exampleSchema.array(),
});

const fixture = new Fixture().extend(ExampleGenerator);
const result = fixture.fromSchema(listSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		examples: [
			{
				id: 1,
			},
			{
				id: 2,
			},
			{
				id: 3,
			},
		],
	}
	// #endregion output
);

test('generates an instance of acme', () => {
	expect(result).toMatchInlineSnapshot(`
		{
		  "examples": [
		    ExampleClass {
		      "id": 1,
		    },
		    ExampleClass {
		      "id": 2,
		    },
		    ExampleClass {
		      "id": 3,
		    },
		  ],
		}
	`);
	expect(result).toEqual(output);
});
