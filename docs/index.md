<h1 align="center">Zod Fixture</h1>
<p align="center">Fixture Generation with 1:1 Zod Parity</p>
<br>
<p align="center" style="display: flex; gap: .5em; justify-content:center">
	<a href="https://badge.fury.io/js/zod-fixture"><img src="https://badge.fury.io/js/zod-fixture.svg" alt="npm version" height="18"></a>
	<a href="https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml"><img src="https://github.com/timdeschryver/zod-fixture/actions/workflows/ci.yaml/badge.svg?branch=beta"></a>
	<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/timdeschryver/zod-fixture" alt="License"></a>
	<a href="https://www.npmjs.com/package/zod-fixture" rel="nofollow"><img src="https://img.shields.io/github/stars/timdeschryver/zod-fixture" alt="stars"></a>
</p>
<br>
<p align="center">
Creating test fixtures should be easy.<br>
<a href="https://github.com/timdeschryver/zod-fixture">zod-fixture</a> helps with the arrange phase of your tests by creating test fixtures based on a <a href="https://github.com/colinhacks/zod">zod</a> schema.
</p>

## Table of Contents

[[toc]]

## Installation

::: code-group

```sh [npm]
npm install -D vitepress
```

```sh [pnpm]
pnpm add -D vitepress
```

```sh [yarn]
yarn add -D vitepress
```

```sh [bun]
bun add -d zod-fixture
```

:::

## Getting Started

The easiest way to start using zod-fixture is to import the preconfigured (more details on this later) `Fixture` class.

::: info
The examples make use of a seed to generate the same fixture every time. This is useful for our docs, or to reproduce issues, but it's not needed in your test code.
:::

::: code-group
<<< @/../examples/create-fixture-person.test.ts#example [Example]
<<< @/../examples/create-fixture-person.test.ts#output [Output]
:::

## Customizing

testing
This library provides utility methods to provide fine-grained support to create your fixtures.
Take a look at the [examples](https://github.com/timdeschryver/zod-fixture/tree/beta/examples) to see how you can use `zod-fixture` in your tests.

### Extending

The `Fixture` class provides a predefined set of generators that supports each type that's included in zod.

For most cases this is fine, and offers a fast and easy way to create fixtures.
But, for those times where you need a custom implementation, you can write your own [Generator](#generators) to change it's behavior using the `extend` method.

In the example below we create a custom implemantion `addressGenerator` to return a custom address object, and a `totalVisitsGenerator` to return a more realistic number of visits.

::: code-group
<<< @/../examples/create-fixture-extension.test.ts#example [Example]
<<< @/../examples/create-fixture-extension.test.ts#output [Output]
:::

### Create Your Own Transformer

Instead of using the opinionated `Fixture` class, you can extend the unopinionated `Transformer` and register the desired generators.

<<< @/../examples/transformer.ts

## API

### Generators

To generate a value based on a zod type we're using what we call a `Generator`.

To help you to create your own generators this library also includes some useful utility methods to generate data.
For example, in the example below we create our own `totalVisitsGenerator` to return more realastic numbers using the `random` utilities.

::: tip
The order the registered generators matters. The first generator that matches the conditions (`schema` and `filter`) is used to create the value.
:::

<<< @/../examples/create-fixture-extension.test.ts#generator

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
