import { z } from 'zod';
import { Transformer } from 'zod-fixture';

const transform = new Transformer().extend([
	/* insert your generators here */
]);

const value = transform.from(z.any());
