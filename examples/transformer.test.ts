// #region example
import { ConstrainedTransformer, UnconstrainedTransformer } from 'zod-fixture';

/**
 * Constrained defaults
 *
 * {
 *   array: {
 *     min: 3,
 *     max: 3,
 *   },
 *   // ...
 *   string: {
 *     min: 15,
 *     max: 15,
 *     characterSet: 'abcdefghijklmnopqrstuvwxyz-',
 *   }
 * }
 */
new ConstrainedTransformer().extend([
	/* insert your generators here */
]);

/**
 * Less constrained. Better for mocking APIs.
 */
new UnconstrainedTransformer().extend([
	/* insert your generators here */
]);
// #endregion example
