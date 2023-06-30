<p align="center">
  <img src="logo.svg" width="200px" align="center" alt="Zod logo" />
  <h1 align="center">Zod Fixture</h1>
  <p align="center">
    ✨ <a href="https://zod.dev">https://zod.dev</a> ✨
    <br/>
	Fixture generation with 1:1 Zod parity
  </p>
</p>
<br/>
<p align="center">
	[![ci](https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml/badge.svg?branch=beta)](https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml)
</p>

Creating test fixtures should be easy.
`zod-fixture` helps with the arrange phase of your tests by creating test fixtures based on a [zod](https://github.com/colinhacks/zod) schema.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=515959275)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-4nsv9h?file=src/preview.ts)

## Example

Pass a zod schema to the `generate` method.

```ts
import { z } from 'zod';
import { generate } from 'zod-fixture';

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

const person = generate(PersonSchema);
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

## Generators

To change it's behavior you can create your own generators.

```ts
import { z, ZodObject } from 'zod';
import { generate, Generator } from 'zod-fixture';

const AddressGenerator = Generator({
	schema: ZodObject,
	filter: ({ context }) => context.path.at(-1) === 'address',
	output: () => ({
		street: 'My Street',
		city: 'My City',
		state: 'My State',
	}),
});

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

const person = generate(PersonSchema, {
	extend: [AddressGenerator],
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

## Getting started with GitHub Codespaces

To get started, create a codespace for this repository by clicking this 👇

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=515959275)

A codespace will open in a web-based version of Visual Studio Code. The [dev container](.devcontainer/devcontainer.json) is fully configured with software needed for this project.

**Note**: Dev containers is an open spec which is supported by [GitHub Codespaces](https://github.com/codespaces) and [other tools](https://containers.dev/supporting).

## Blog posts

- [Why we should verify HTTP response bodies, and why we should use zod for this](https://timdeschryver.dev/blog/why-we-should-verify-http-response-bodies-and-why-we-should-use-zod-for-this)
- [How zod-fixture can help with your test setups](https://timdeschryver.dev/blog/how-zod-fixture-can-help-with-your-test-setups)
- [Using zod-fixture with MSW to generate mocked API responses](https://timdeschryver.dev/blog/using-zod-fixture-with-msw-to-generate-mocked-api-responses)

## Credits

This package is inspired on [AutoFixture](https://github.com/AutoFixture/AutoFixture).
