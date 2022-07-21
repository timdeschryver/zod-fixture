# zod-fixture

Create test fixtures based on a [zod](https://github.com/colinhacks/zod) schema.

## Example

Pass a zod schema to the `create` method.

```ts
import { z } from 'zod';
import { create } from 'zod-fixture';

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

const person = create(PersonSchema);
```

Gives you the following value for `person`:

```json
{
  "name": "name-b1d5c46c-ec89-4fd5-abdf-b263ae808b84",
  "birthday": "2021-01-11T23:58:00.091Z",
  "address": {
    "street": "street-a088e991-896e-458c-bbbd-7045cd880879",
    "city": "city-0a3d2843-5b32-48f0-99e4-bdda3c6ed531",
    "state": "state-b5f857d4-ccad-46ad-94da-4524ecc672ae"
  },
  "pets": [
    {
      "name": "name-27bdfe2e-2408-4fbe-b984-c5043211ec70",
      "breed": "breed-addd4dcb-0fa3-4682-af78-af7a32e03890"
    },
    {
      "name": "name-bf785f1c-e989-4ea7-97ac-9e9a9d629b1f",
      "breed": "breed-2c177585-7a22-4bef-a50f-a00182bdfdce"
    },
    {
      "name": "name-7ac981b0-4cc8-4236-9d76-642121b9bac3",
      "breed": "breed-0e156d71-5d81-4ffd-ad51-87a2c6baeea0"
    }
  ],
  "totalVisits": 372
}
```