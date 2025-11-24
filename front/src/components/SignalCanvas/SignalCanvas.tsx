import { useEffect, useRef, useState } from 'react';
import type { SignalCanvasProps } from '../../types';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../config/constants';
import { mapValueToHSL } from '../../utils/colorMapping';

export function SignalCanvas({
	signalData,
	maxHistory = 100,
}: SignalCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [history, setHistory] = useState<number[][]>([]);

	// Update history when new data arrives
	useEffect(() => {
		if (!signalData || !Array.isArray(signalData) || signalData.length === 0) {
			return;
		}

		setHistory((prev) => {
			const newHistory = [...prev, signalData];
			// Keep only last maxHistory updates
			if (newHistory.length > maxHistory) {
				return newHistory.slice(newHistory.length - maxHistory);
			}
			return newHistory;
		});
	}, [signalData, maxHistory]);

	// Render the canvas
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Clear canvas
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		if (history.length === 0) {
			return;
		}

		// Draw 1000 horizontal lines, each showing history of one signal point
		const lineHeight = CANVAS_HEIGHT / 1000;
		const pixelWidth = CANVAS_WIDTH / history.length;

		history.forEach((dataSnapshot, timeIndex) => {
			const x = timeIndex * pixelWidth;

			dataSnapshot.forEach((value, signalIndex) => {
				const y = signalIndex * lineHeight;

				ctx.fillStyle = mapValueToHSL(value);
				ctx.fillRect(x, y, Math.ceil(pixelWidth), Math.ceil(lineHeight));
			});
		});
	}, [history]);

	return (
		<canvas
			ref={canvasRef}
			width={CANVAS_WIDTH}
			height={CANVAS_HEIGHT}
			className='signal-canvas'
			role='img'
			aria-label='Radio signal visualization canvas'
		/>
	);
}
