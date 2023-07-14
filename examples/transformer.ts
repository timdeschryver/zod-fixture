import { z } from 'zod';
import { UnconstrainedFixture } from 'zod-fixture';

const transform = new UnconstrainedFixture().extend([
	/* insert your generators here */
]);

transform.fromSchema(z.any());
