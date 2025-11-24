/**
 * Maps a signal value (0-255) to an RGB color
 * @param value - Signal intensity value
 * @returns RGB color string
 */
export const mapValueToColor = (value: number): string => {
	return `rgb(${value}, 0, 0)`;
};

/**
 * Maps a signal value to HSL color for full spectrum
 * @param value - Signal intensity value (0-255)
 * @returns HSL color string
 */
export const mapValueToHSL = (value: number): string => {
	const hue = (value / 255) * 360;
	return `hsl(${hue}, 100%, 50%)`;
};
