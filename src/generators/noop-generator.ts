// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: () => void = () => {};

export function generateNoop(): () => void {
	return noop;
}
