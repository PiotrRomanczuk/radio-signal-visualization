/**
 * Generates an array of random integers representing a radio signal.
 * @param length - The number of samples to generate.
 * @param min - The minimum value for a sample.
 * @param max - The maximum value for a sample.
 * @returns An array of random integers.
 */
export function generateSignal(
	length: number,
	min: number,
	max: number
): number[] {
	const signal: number[] = [];
	for (let i = 0; i < length; i++) {
		const value = Math.floor(Math.random() * (max - min + 1)) + min;
		signal.push(value);
	}
	return signal;
}
