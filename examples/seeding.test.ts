import { expect, test } from 'vitest';
// #region example
import { z } from 'zod';
import { Fixture } from 'zod-fixture';

const fixture = new Fixture({ seed: 38 });

const v1 = fixture.fromSchema(z.string());
const v2 = fixture.fromSchema(z.string());
const v3 = fixture.fromSchema(z.string());
// #endregion example

const output =
	'' +
	// #region output
	'xyzyskryqofekdg';
// #endregion output

test('generates a person', () => {
	expect(v1).toMatchInlineSnapshot('"xyzyskryqofekdg"');
	expect(v1).toEqual(output);
	expect(v1).toEqual(v2);
	expect(v2).toEqual(v3);
});
