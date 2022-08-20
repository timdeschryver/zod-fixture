# zod-fixture

Creating test fixtures should be easy.
`zod-fixture` helps with the arrange phase of your tests by creating test fixtures based on a [zod](https://github.com/colinhacks/zod) schema.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-4nsv9h?file=src/preview.ts)

## Example

Pass a zod schema to the `createFixture` method.

```ts
import { z } from 'zod';
import { createFixture } from 'zod-fixture';

const PersonSchema = z.object({
	name: z.string(),
	birthday: z.date(),
	address: z.object({
		street: z.string(),
		city: z.string(),
		state: z.string(),
	}),
	pets: z.array(z.object({ name: z.string(), breed: z.string() })),
	totalVisits: z.number(),
});

const person = createFixture(PersonSchema);
```

Gives you the following value for `person`:

```json
{
	"name": "name-b1d5c46c-ec89-4fd5-abdf-b263ae808b84",
	"birthday": "2021-01-11T23:58:00.091Z",
	"address": {
		"street": "street-a088e991-896e-458c-bbbd-7045cd880879",
		"city": "city-0a3d2843-5b32-48f0-99e4-bdda3c6ed531",
		"state": "state-b5f857d4-ccad-46ad-94da-4524ecc672ae"
	},
	"pets": [
		{
			"name": "name-27bdfe2e-2408-4fbe-b984-c5043211ec70",
			"breed": "breed-addd4dcb-0fa3-4682-af78-af7a32e03890"
		},
		{
			"name": "name-bf785f1c-e989-4ea7-97ac-9e9a9d629b1f",
			"breed": "breed-2c177585-7a22-4bef-a50f-a00182bdfdce"
		},
		{
			"name": "name-7ac981b0-4cc8-4236-9d76-642121b9bac3",
			"breed": "breed-0e156d71-5d81-4ffd-ad51-87a2c6baeea0"
		}
	],
	"totalVisits": 372
}
```

## Customizations

To change it's behavior you can create your own customizations.

```ts
import { z } from 'zod';
import { createFixture, numberRandomizeCustomization } from 'zod-fixture';
import type { Customization } from 'zod-fixture';

const numberCustomization = numberRandomizeCustomization(0, 5);
const addressCustomization: Customization = {
	condition: ({ type, propertName }) =>
		type === 'object' && propertName === 'address',
	generator: () => {
		return {
			street: 'My Street',
			city: 'My City',
			state: 'My State',
		};
	},
};

const PersonSchema = z.object({
	name: z.string(),
	birthday: z.date(),
	address: z.object({
		street: z.string(),
		city: z.string(),
		state: z.string(),
	}),
	pets: z.array(z.object({ name: z.string(), breed: z.string() })),
	totalVisits: z.number(),
});

const person = createFixture(PersonSchema, {
	defaultLength: 1,
	customizations: [numberCustomization, addressCustomization],
});
```

Gives us the following person:

```json
{
	"name": "name-e5d36b60-2404-4cdc-a438-e9fc8bf9b704",
	"birthday": "2022-04-01T07:22:37.187Z",
	"address": { "street": "My Street", "city": "My City", "state": "My State" },
	"pets": [
		{
			"name": "name-1cd9b68f-94ab-4881-b5ba-2a996b68d9c3",
			"breed": "breed-020aae4b-c88f-4f7e-9711-bbe1b5a01c0f"
		}
	],
	"totalVisits": 3
}
```

## Credits

This package is inspired on [AutoFixture](https://github.com/AutoFixture/AutoFixture).
