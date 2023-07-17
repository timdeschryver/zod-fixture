<h1 align="center">Zod Fixture</h1>
<p align="center">Fixture Generation with 1:1 Zod Parity</p>
<br>
<p align="center" style="display: flex; gap: .5em; justify-content: center">
	<a href="https://badge.fury.io/js/zod-fixture"><img src="https://badge.fury.io/js/zod-fixture.svg" alt="npm version" height="18"></a>
	<a href="https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml"><img src="https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml/badge.svg?branch=main"></a>
	<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/timdeschryver/zod-fixture" alt="License"></a>
	<a href="https://www.npmjs.com/package/zod-fixture" rel="nofollow"><img src="https://img.shields.io/github/stars/timdeschryver/zod-fixture" alt="stars"></a>
</p>
<br>
<p align="center">
Creating test fixtures should be easy.<br>
<a href="https://github.com/timdeschryver/zod-fixture">zod-fixture</a> helps with the arrange phase of your tests by creating test fixtures based on a <a href="https://zod.dev/">zod</a> schema.
</p>

## Table of Contents

[[toc]]

## Installation

::: code-group

```sh [npm]
npm install -D zod-fixture
```

```sh [pnpm]
pnpm add -D zod-fixture
```

```sh [yarn]
yarn add -D zod-fixture
```

```sh [bun]
bun add -d zod-fixture
```

:::

## Getting Started

The easiest way to start using `zod-fixture` is to import the pre-configured `createFixture` function.

::: code-group
<<< @/../examples/fixture-person.test.ts#example [Example]
<<< @/../examples/fixture-person.test.ts#output [Output]
:::

::: info
The examples make use of the optional [seed](#seed-optional) parameter to generate the same fixture every time. This is useful for our docs, deterministic testing, and to reproduce issues, but is not necessary in your code. Simply calling `createFixture` with no configuration is acceptable.
:::

Take a look at the [examples](https://github.com/timdeschryver/zod-fixture/tree/main/examples) to see how you can use `zod-fixture` in your tests.

## Customizing

`zod-fixture` is highly customizable. We provide you with the same utility methods we use internally to give you fine-grained support for creating your own fixtures.

### Extending

The easiset way to start customizing `zod-fixture` is to use the `Fixture` class directly and extend it with your own [generator](#generators).

::: info
`createFixture(...)` is just syntactic sugar for `new Fixture().fromSchema(...)`
:::

The example below uses 2 custom generators and a typical pattern for filtering based on the keys of an object.

::: code-group
<<< @/../examples/fixture-extension.test.ts#example [Example]
<<< @/../examples/fixture-extension.test.ts#output [Output]
:::

::: tip
The order the registered generators matters. The first generator that matches the conditions (`schema` and `filter`) is used to create the value.
:::

### Generators

To generate a value based on a zod type we're using what we call a `Generator`.

A `Generator` has 3 fundamental parts:

- [schema](#matching) -- the zod type to match
- [filter](#filtering) -- [optional] a function to further refine our match (ie filtering by keys or zod checks)
- [output](#output) -- a function that's called to produce the fixture

#### Matching

All generators require a `zod` schema to match against. A schema can be provided in the following ways:

- A zod type constructor (ie `ZodString`)
- An instance of a type (typically `z.custom`)

::: code-group
<<< @/../examples/generator-schema-matching.test.ts#example [Example]
<<< @/../examples/generator-schema-matching.test.ts#output [Output]
:::

#### Filtering

In addition to matching schemas, `zod-fixture` provides robust tools for filtering, allowing you to further narrow the matches for your generator. There are two common patterns for filtering.

##### Filter by Check

In the case where you use a `zod` method like `z.string().email()`, `zod` adds what they call a "check" to the defintion. These are additional constraints that are checked during parsing that don't conform to a Typescript type. (ie TS does not have the concept of an email, just a string). `zod-fixture` provides a type safe utility called `checks` for interacting with these additional constraints.

There are two methods provided by the `checks` utility:

- `has` -- returns a boolean letting you know if a particular check exists on the schema.
- `find` -- returns the full definition of a check, which can be useful for generating output.

::: code-group
<<< @/../examples/generator-filtering-zod-checks.test.ts#example [Example]
<<< @/../examples/generator-filtering-zod-checks.test.ts#output [Output]
:::

##### Filter by Key

Matching keys of an object is another common pattern and a bit tricky if you don't give it enough thought. Every generator is called with a `context` and that context includes a `path`. The path is an array of keys that got us to this value. Generally speaking, you will only want the last key in the path for matching things like "name", "email", "age", etc in a deeply nested object.

::: code-group
<<< @/../examples/generator-filtering-key-match.test.ts#example [Example]
<<< @/../examples/generator-filtering-key-match.test.ts#output [Output]
:::

#### Output

Output is a function that generates the fixture for any matches. `zod-fixture` provides a randomization utility for creating data, in addition to all of the defaults (including the seed).

For example, in the example below we create our own `totalVisitsGenerator` to return more realastic numbers using the `random` utilities.

<<< @/../examples/fixture-extension.test.ts#generator

## FAQ

### I have a custom type that I need to support. How do I do that?

`zod-fixture` was built with this in mind. Simply define your custom type using zod's `z.custom` and pass the resulting schema to your custom generator.

::: code-group
<<< @/../examples/custom-type.test.ts#example [Example]
<<< @/../examples/custom-type.test.ts#output [Output]
:::

### `z.instanceof` isn't returning what I expected. What gives?

`z.instanceof` is one of the few schemas that doesn't have first party support in `zod`. It's technically a `z.custom` under the hood, which means the only way to match is for you to create a custom generator and pass an instance of it as your schema.

::: code-group
<<< @/../examples/instanceof-type.test.ts#example [Example]
<<< @/../examples/instanceof-type.test.ts#output [Output]
:::

### Do you support faker/chance/falso?

The short answer, not yet. We plan to build out pre-defined generators for popular mocking libraries but are currently prioritizing reliability and ease of use. If you'd like to help us build out this functionality, feel free to open a pull request 😀

## API

### Fixture

::: info
`Fixture` is a `Transformer` that comes prepackaged with generators for each of the first party types that Zod provides. For most cases, this is all you wil need, and offers a fast and easy way to create fixtures. For building a custom `Transformer` refer to the [Advanced](#advanced-topics) documentation.
:::

#### Config

We provide sane defaults for the random utilities used by our generators, but these can easily be customized.

<<< @/../src/transformer/defaults.ts#defaults

##### Seed (optional)

A seed can be provided to produce the same results every time.

```ts
const fixture = new Fixture({ seed: number });
```

## Advanced Topics

### Create Your Own Transformer

Instead of using one of the opinionated `Fixture`s, you can extend the unopinionated `Transformer` and register the desired generators.

<<< @/../examples/transformer.test.ts#example

## Migration Guide

### v1 to v2

The v2 version is a total rewrite of v1.
Thanks for all the help [@THEtheChad](https://twitter.com/thethechad) 🤝

#### Why a rewrite?

v1 was flexible and allowed that multiple validation libraries could be supported in the future.
But, this made things more complex and I don't think we intended to add more libraries than `zod`.

v2 is a full-on `zod` version.
This benefits you because we make more use of zod's schema while creating fixtures.
For example, when you want to create a custom generator (previously a customization) you can also access zod's schema definition.

> Fixture Generation with 1:1 Zod Parity

#### Breaking changes

##### createFixture

`createFixture` still exists, but it could be that it generated its output with a slightly different output.
It still is compatible (even more compatible) with zod's schema.
For example, the changes to a string output:

BEFORE:

```
street-a088e991-896e-458c-bbbd-7045cd880879
```

AFTER:

```
fbmiabahyvsy-vm
```

##### Customization

`Customization` is renamed to `Generator`.

BEFORE:

```ts
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
```

AFTER:

```ts
const addressGenerator = Generator({
	schema: ZodObject,
	filter: ({ context }) => context.path.at(-1) === 'address',
	output: () => ({
		street: 'My Street',
		city: 'My City',
		state: 'My State',
	}),
});
```

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
