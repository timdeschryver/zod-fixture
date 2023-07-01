<h1 align="center">Zod Fixture</h1>
<p align="center">Fixture Generation with 1:1 Zod Parity</p>
<br>
<p align="center">
	<a href="https://badge.fury.io/js/zod-fixture"><img src="https://badge.fury.io/js/zod-fixture.svg" alt="npm version" height="18"></a>
	<a href="https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml"><img src="https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml/badge.svg?branch=beta"></a>
	<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/timdeschryver/zod-fixture" alt="License"></a>
	<a href="https://www.npmjs.com/package/zod-fixture" rel="nofollow"><img src="https://img.shields.io/github/stars/timdeschryver/zod-fixture" alt="stars"></a>
</p>
<br>
<p align="center">
Creating test fixtures should be easy.<br>
<a href="https://www.npmjs.com/package/zod-fixture">zod-fixture</a> helps with the arrange phase of your tests by creating test fixtures based on a <a href="https://github.com/colinhacks/zod">zod</a> schema.
</p>

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Customizing](#customizing)
  - [Extending](#extending)
  - [Create Your Own Transformer](#create-your-own-transformer)
- [API](#api)
  - [Generators](#generators)
- [Contributing](#contributing)
  - [CodeSpaces](#getting-started-with-github-codespaces)
  - [StackBlitz](#stackblitz)
- [Blog Posts](#blog-posts)
- [Credits](#credits)

## Installation

From npm (Node/Bun)

```bash
npm install -D zod-fixture       # npm
yarn add -D zod-fixture          # yarn
bun add -d zod-fixture           # bun
pnpm add -D zod-fixture          # pnpm
```

## Getting Started

The easiest way to start using zod-fixture is to import the preconfigured `Fixture` class.

<sub>[view implementation](./examples/create-fixture-person.test.ts)</sub>

```ts
import { z } from 'zod';
import { Fixture } from 'zod-fixture';

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

const fixture = new Fixture({ seed: 11 });
const person = fixture.from(PersonSchema);
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

## Customizing

This library provides utility methods to provide fine-grained support to create your fixtures.
Take a look at the [examples](./examples) to see how you can use `zod-fixture` in your tests.

### Extending

The `Fixture` class provides a predefined set of generators that supports each type that's included in zod.

For most cases this is fine, and offers a fast and easy way to create fixtures.
But, for those times where you need a custom implementation, you can write your own [Generator](#generators) to change it's behavior using the `extend` method.

In the example below we create a custom implemantion `AddressGenerator` to return a custom address object.

<sub>[view implementation](./examples/create-fixture-using-generators-person.test.ts)</sub>

```ts
import { z, ZodObject } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

const addressGenerator = Generator({
	schema: ZodObject,
	filter: ({ context }) => context.path.at(0) === 'address',
	output: () => ({
		street: 'My Street',
		city: 'My City',
		state: 'My State',
	}),
});

const totalVisitsGenerator = Generator({
	schema: ZodNumber,
	output: ({ transform }) => transform.utils.random.int({ min: 0, max: 25 }),
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

const fixture = new Fixture({ seed: 38 }).extend([
	addressGenerator,
	totalVisitsGenerator,
]);
const person = fixture.from(PersonSchema);
```

### Create Your Own Transformer

Instead of using the opinionated `Fixture` class, you can extend the unopinionated `Transformer` and register the desired generators.

```ts
import { Transformer } from 'zod-fixture';

const transform = new Transformer().extend([
	/* insert your generators here */
]);

const value = transform.from(zodSchema);
```

## API

### Generators

To generate a value based on a zod type we're using what we call a `Generator`.

To make your own generators simpler this library also includes some useful utility methods to generate data.

In the example below we create our own `NumberBetween0And25Generator` to return more realastic numbers using the `random` utilities.

```ts
import { z, ZodObject } from 'zod';
import { Fixture, Generator } from 'zod-fixture';

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

const person = new Fixture()
	.extend([AddressGenerator, NumberBetween0And25Generator])
	.from(PersonSchema);
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

::: tip
The order the registered generators matters. The first generator that matches the conditions (`schema` and `filter`) is used to create the value.
:::

## Contributing

### Getting started with GitHub Codespaces

To get started, create a codespace for this repository by clicking this 👇

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=515959275)

A codespace will open in a web-based version of Visual Studio Code. The [dev container](.devcontainer/devcontainer.json) is fully configured with software needed for this project.

**Note**: Dev containers is an open spec which is supported by [GitHub Codespaces](https://github.com/codespaces) and [other tools](https://containers.dev/supporting).

### StackBlitz

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/vitejs-vite-4nsv9h?file=src/preview.ts)

## Blog posts

- [Why we should verify HTTP response bodies, and why we should use zod for this](https://timdeschryver.dev/blog/why-we-should-verify-http-response-bodies-and-why-we-should-use-zod-for-this)
- [How zod-fixture can help with your test setups](https://timdeschryver.dev/blog/how-zod-fixture-can-help-with-your-test-setups)
- [Using zod-fixture with MSW to generate mocked API responses](https://timdeschryver.dev/blog/using-zod-fixture-with-msw-to-generate-mocked-api-responses)

## Credits

This package is inspired on [AutoFixture](https://github.com/AutoFixture/AutoFixture).
