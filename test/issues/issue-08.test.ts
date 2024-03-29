import { Fixture } from '@/public';
import { expect, test } from 'vitest';
import { z } from 'zod';

test('creates object with string property of length', () => {
	const schema = z.object({
		lastFour: z.string().length(4),
	});
	const fixture = new Fixture().fromSchema(schema);
	expect(fixture.lastFour).toHaveLength(4);
});
