import { generateSignal } from './SignalGenerator';

describe('SignalGenerator', () => {
	test('should generate an array of specified length', () => {
		const length = 100;
		const signal = generateSignal(length, 0, 255);
		expect(signal).toHaveLength(length);
		expect(Array.isArray(signal)).toBe(true);
	});

	test('should generate values within the specified range', () => {
		const min = 10;
		const max = 50;
		const signal = generateSignal(100, min, max);

		signal.forEach((value) => {
			expect(value).toBeGreaterThanOrEqual(min);
			expect(value).toBeLessThanOrEqual(max);
		});
	});

	test('should generate integers', () => {
		const signal = generateSignal(100, 0, 255);
		signal.forEach((value) => {
			expect(Number.isInteger(value)).toBe(true);
		});
	});
});
