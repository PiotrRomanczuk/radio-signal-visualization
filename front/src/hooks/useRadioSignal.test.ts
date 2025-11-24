import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useRadioSignal } from './useRadioSignal';

describe('useRadioSignal', () => {
	let mockWebSocket: any;
	let mockWebSocketInstance: any;

	beforeEach(() => {
		// Mock WebSocket
		mockWebSocketInstance = {
			send: vi.fn(),
			close: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			readyState: WebSocket.OPEN,
		};

		mockWebSocket = vi.fn(() => mockWebSocketInstance);
		global.WebSocket = mockWebSocket as any;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should initialize with null signal data', () => {
		const { result } = renderHook(() => useRadioSignal('ws://localhost:3000'));

		expect(result.current.signalData).toBeNull();
		expect(result.current.isConnected).toBe(false);
		expect(result.current.error).toBeNull();
	});

	it('should establish WebSocket connection', () => {
		renderHook(() => useRadioSignal('ws://localhost:3000'));

		expect(mockWebSocket).toHaveBeenCalledWith('ws://localhost:3000');
	});

	it('should set isConnected to true when connection opens', async () => {
		const { result } = renderHook(() => useRadioSignal('ws://localhost:3000'));

		// Simulate connection open
		const onOpenHandler =
			mockWebSocketInstance.addEventListener.mock.calls.find(
				(call: any[]) => call[0] === 'open'
			)?.[1];

		onOpenHandler?.();

		await waitFor(() => {
			expect(result.current.isConnected).toBe(true);
		});
	});

	it('should update signalData when receiving valid data', async () => {
		const { result } = renderHook(() => useRadioSignal('ws://localhost:3000'));

		const testData = [100, 150, 200];
		const messageEvent = new MessageEvent('message', {
			data: JSON.stringify(testData),
		});

		// Simulate message received
		const onMessageHandler =
			mockWebSocketInstance.addEventListener.mock.calls.find(
				(call: any[]) => call[0] === 'message'
			)?.[1];

		onMessageHandler?.(messageEvent);

		await waitFor(() => {
			expect(result.current.signalData).toEqual(testData);
		});
	});

	it('should set error when receiving invalid JSON', async () => {
		const { result } = renderHook(() => useRadioSignal('ws://localhost:3000'));

		const messageEvent = new MessageEvent('message', {
			data: 'invalid json',
		});

		const onMessageHandler =
			mockWebSocketInstance.addEventListener.mock.calls.find(
				(call: any[]) => call[0] === 'message'
			)?.[1];

		onMessageHandler?.(messageEvent);

		await waitFor(() => {
			expect(result.current.error).toBeTruthy();
		});
	});

	it('should set error when connection fails', async () => {
		const { result } = renderHook(() => useRadioSignal('ws://localhost:3000'));

		const errorEvent = new Event('error');

		const onErrorHandler =
			mockWebSocketInstance.addEventListener.mock.calls.find(
				(call: any[]) => call[0] === 'error'
			)?.[1];

		onErrorHandler?.(errorEvent);

		await waitFor(() => {
			expect(result.current.error).toBeTruthy();
			expect(result.current.isConnected).toBe(false);
		});
	});

	it('should cleanup WebSocket connection on unmount', () => {
		const { unmount } = renderHook(() => useRadioSignal('ws://localhost:3000'));

		unmount();

		expect(mockWebSocketInstance.close).toHaveBeenCalled();
	});

	it('should handle connection close event', async () => {
		const { result } = renderHook(() => useRadioSignal('ws://localhost:3000'));

		const closeEvent = new CloseEvent('close');

		const onCloseHandler =
			mockWebSocketInstance.addEventListener.mock.calls.find(
				(call: any[]) => call[0] === 'close'
			)?.[1];

		onCloseHandler?.(closeEvent);

		await waitFor(() => {
			expect(result.current.isConnected).toBe(false);
		});
	});
});
