import { expect, test } from 'vitest';
// #region example
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
const person = fixture.fromSchema(PersonSchema);
// #endregion example

const output = Object.assign(
	// #region output
	{
		address: {
			city: 'fdEqfOAdfay',
			state: '_!;"_NV-ZeE&owK\'^\\f"bA(_z',
			street: "}L%:YfUQ>N'@COuJ_",
		},
		birthday: new Date('1980-09-26T06:36:51.341Z'),
		name: 'j"A)nc*?=ICpArj[hn$)YOe)Od',
		pets: [
			{
				breed: 'MCx&^>xCiZ`EhMygjbl*ZMG.J',
				name: '>^C<QH%EF+n(e//=d,t',
			},
			{
				breed: '(RCdKX',
				name: 'UJHEIo?_&-A^c][/v#Rq',
			},
			{
				breed: '%{;z]K',
				name: 'jVr\\[W$Av',
			},
		],
		totalVisits: 5544703130861567,
	}
	// #endregion output
);

test('generates a person', () => {
	expect(person).toEqual(output);
});
