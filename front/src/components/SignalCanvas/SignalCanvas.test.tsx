import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignalCanvas } from './SignalCanvas';

describe('SignalCanvas', () => {
	const mockSignalData = Array.from({ length: 1000 }, (_, i) => i % 256);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render canvas element with correct dimensions', () => {
		render(<SignalCanvas signalData={mockSignalData} />);

		const canvas = screen.getByRole('img') as HTMLCanvasElement;
		expect(canvas).toBeInTheDocument();
		expect(canvas.width).toBe(800);
		expect(canvas.height).toBe(500);
	});

	it('should have correct canvas className', () => {
		render(<SignalCanvas signalData={mockSignalData} />);

		const canvas = screen.getByRole('img') as HTMLCanvasElement;
		expect(canvas).toHaveClass('signal-canvas');
	});

	it('should render with null signalData', () => {
		render(<SignalCanvas signalData={null} />);

		const canvas = screen.getByRole('img') as HTMLCanvasElement;
		expect(canvas).toBeInTheDocument();
	});

	it('should render with empty signalData array', () => {
		render(<SignalCanvas signalData={[]} />);

		const canvas = screen.getByRole('img') as HTMLCanvasElement;
		expect(canvas).toBeInTheDocument();
	});

	it('should update when signalData changes', () => {
		const { rerender } = render(<SignalCanvas signalData={mockSignalData} />);

		const newData = Array.from({ length: 1000 }, (_, i) => (i + 100) % 256);
		rerender(<SignalCanvas signalData={newData} />);

		const canvas = screen.getByRole('img') as HTMLCanvasElement;
		expect(canvas).toBeInTheDocument();
	});

	it('should have accessible name', () => {
		render(<SignalCanvas signalData={mockSignalData} />);

		const canvas = screen.getByRole('img', {
			name: /radio signal visualization/i,
		});
		expect(canvas).toBeInTheDocument();
	});
});
