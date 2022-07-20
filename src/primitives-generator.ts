// generate number between 1 and 100
export function randomNumberGenerator(): number {
	return Math.floor(Math.random() * 100) + 1;
}

// generate guid
export function stringGenerator(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

let boolSwitcher = false;
export function booleanGenerator(): boolean {
	boolSwitcher = !boolSwitcher;
	return boolSwitcher;
}
