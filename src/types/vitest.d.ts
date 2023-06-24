import type { ZodTypeAny } from 'zod';
import type { Core } from '../src/core/core';

interface CustomMatchers<R = unknown> {
	toBeZodType(params: { schema: ZodTypeAny; core: Core }): R;
}

declare module 'vitest' {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
