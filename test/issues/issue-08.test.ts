import { expect, test } from 'vitest';
import { createFixture } from '../../src';
import { z } from 'zod';

test('creates object with string property of length', () => {
	const schema = z.object({
		lastFour: z.string().length(4),
	});
	const fixture = createFixture(schema);
	expect(fixture.lastFour).toHaveLength(4);
});
