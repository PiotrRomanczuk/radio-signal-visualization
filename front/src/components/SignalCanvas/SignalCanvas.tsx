import { useEffect, useRef } from 'react';
import type { SignalCanvasProps } from '../../types';
import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	GRID_COLUMNS,
	GRID_ROWS,
} from '../../config/constants';
import { mapValueToHSL } from '../../utils/colorMapping';

export function SignalCanvas({ signalData }: SignalCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Clear canvas
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		// If no data, just show empty black canvas
		if (!signalData || signalData.length === 0) {
			return;
		}

		// Calculate cell dimensions
		const cellWidth = CANVAS_WIDTH / GRID_COLUMNS;
		const cellHeight = CANVAS_HEIGHT / GRID_ROWS;

		// Draw each cell
		signalData.forEach((value: number, index: number) => {
			const row = Math.floor(index / GRID_COLUMNS);
			const col = index % GRID_COLUMNS;

			const x = col * cellWidth;
			const y = row * cellHeight;

			ctx.fillStyle = mapValueToHSL(value);
			ctx.fillRect(x, y, cellWidth, cellHeight);
		});
	}, [signalData]);

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
