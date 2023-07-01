<h1 align="center">Zod Fixture</h1>
<h5 align="center">Fixture Generation with 1:1 Zod Parity</h5>
<br>
<p align="center">
	<a href="https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml"><img src="https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml/badge.svg?branch=beta"></a>
	<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/timdeschryver/zod-fixture" alt="License"></a>
	<a href="https://www.npmjs.com/package/zod-fixture" rel="nofollow"><img src="https://img.shields.io/github/stars/timdeschryver/zod-fixture" alt="stars"></a>
</p>
<br>

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=515959275)
[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-4nsv9h?file=src/preview.ts)

## Why

Creating test fixtures should be easy.
`zod-fixture` helps with the arrange phase of your tests by creating test fixtures based on a [zod](https://github.com/colinhacks/zod) schema.

## How

This library provides utility methods to provide fine-grained support to create your fixtures.
Take a look at the [examples](./examples) to see how you can use `zod-fixture` in your tests.

### createFixture

The `createFixture` method is the easiest way to create fixtures in an opinionated way.

> You can also take a look at the [implemented example](./examples/create-fixture-person.test.ts).

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

The above results in the following value for `person`:

```json
{
	"address": {
		"city": "43K>5SG250E",
		"state": "kbszkSZm^3Kg<CPyfa4z1HikF",
		"street": "oQes]5YUwRzbITAPk"
	},
	"birthday": "1980-09-26T06:36:51.341Z",
	"name": "8zGj;1humNI>G?8p6;ej\\\\T4jS3",
	"pets": [
		{
			"breed": "RIEgfwDI7]yK6RE581:h]QM^P",
			"name": "wgIuUNfJKl;i4``l3`A"
		},
		{
			"breed": "iVI2P\\\\",
			"name": "YOMKN<ukgnGg1qp`CdV>"
		},
		{
			"breed": "fotFqP",
			"name": "8Z?ap[eGC"
		}
	],
	"totalVisits": 5544703130861567
}
```

### Generators

To generate a value based on a zod type we're using what we call a `Generator`.

The `createFixture` method provides a predefined set of generators that supports each type that's included in zod.

For most cases this is fine, and offers a fast and easy way to create fixtures.
But, for those times where you need a custom implementation, you can write your own `Generator` to change it's behavior.

> You can also take a look at the [implemented example](./examples/create-fixture-using-generators-person.test.ts).

In the example below we create a custom implemantion `AddressGenerator` to return a custom address object.

```ts
import { z, ZodObject } from 'zod';
import { createFixture, Generator } from 'zod-fixture';

const AddressGenerator = Generator({
	// we're interested in zod objects
	schema: ZodObject,
	// we only want to change the behavior of the address object
	filter: ({ context }) => context.path.at(0) === 'address',
	// return the desired output based on a custom implementation
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

const person = createFixture(PersonSchema, {
	extend: [AddressGenerator],
});
```

To make your own generators simpler this library also includes some useful utility methods to generate data.

In the example below we create our own `NumberBetween0And25Generator` to return more realastic numbers using the `random` utilities.

```ts
import { z, ZodObject } from 'zod';
import { createFixture, Generator } from 'zod-fixture';

const NumberBetween0And25Generator = Generator({
	// we're interested in zod numbers
	schema: ZodNumber,
	// because we only have one number object we can ignore the additional `filter`
	// we make use of the utils to create a random number
	output: ({ core }) => core.utils.random.int({ min: 0, max: 25 }),
});

const AddressGenerator = Generator({
	// we're interested in zod objects
	schema: ZodObject,
	// we only want to change the behavior of the address object
	filter: ({ context }) => context.path.at(0) === 'address',
	// return the desired output based on a custom implementation
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

const person = createFixture(PersonSchema, {
	extend: [AddressGenerator, NumberBetween0And25Generator],
});
```

When we create a new `person` fixture using the two custom generators we get the following value (notice the `address` and `totalVisits` values).

```json
{
	"address": {
		"city": "My City",
		"state": "My State",
		"street": "My Street"
	},
	"birthday": "1926-02-23T02:07:24.494Z",
	"name": "c",
	"pets": [
		{
			"breed": "5yOQfkYfI6=kRuH^F?5BCNHft",
			"name": "mYxRp1GBY2aw"
		},
		{
			"breed": "6Qz\\\\s",
			"name": "_"
		},
		{
			"breed": "6e9",
			"name": ";l]@"
		}
	],
	"totalVisits": 22
}
```

⚠️ Note: The order the registered generators matters. The first generator that matches the conditions (`schema` and `filter`) is used to create the value.

### Create your own fixtures

Instead of using the opinionated `createFixture` method, you can also define the configuration to create a custom fixture using your own set of generators.

For this, you can use `Core` and register the desired generators.

```ts
import { Core } from 'zod-fixture';

function createCustomFixture() {
	return new Core()
		.register([
			/* insert your generators here */
		])
		.generate(schema);
}

const value = createCustomFixture(zodSchema);
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
