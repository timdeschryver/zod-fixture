import { expect, test } from 'vitest';
import type { ZodTypeAny } from 'zod';
import { create } from '../src';

test('throws on invalid schema type', () => {
	const zodType = {
		_def: {
			typeName: 'I_DONT_EXIST',
		},
	} as ZodTypeAny;
	expect(() => create(zodType)).toThrowError(zodType._def.typeName);
});
