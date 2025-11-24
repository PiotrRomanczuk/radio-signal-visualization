import { useState, useEffect, useCallback } from 'react';
import type { SignalData } from '../types';

interface UseRadioSignalReturn {
	signalData: SignalData | null;
	isConnected: boolean;
	error: Error | null;
}

export function useRadioSignal(wsUrl: string): UseRadioSignalReturn {
	const [signalData, setSignalData] = useState<SignalData | null>(null);
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const handleMessage = useCallback((event: MessageEvent) => {
		try {
			const data = JSON.parse(event.data) as SignalData;
			setSignalData(data);
			setError(null);
		} catch (err) {
			setError(new Error('Failed to parse signal data'));
		}
	}, []);

	const handleOpen = useCallback(() => {
		setIsConnected(true);
		setError(null);
	}, []);

	const handleError = useCallback(() => {
		setError(new Error('WebSocket connection error'));
		setIsConnected(false);
	}, []);

	const handleClose = useCallback(() => {
		setIsConnected(false);
	}, []);

	useEffect(() => {
		const ws = new WebSocket(wsUrl);

		ws.addEventListener('open', handleOpen);
		ws.addEventListener('message', handleMessage);
		ws.addEventListener('error', handleError);
		ws.addEventListener('close', handleClose);

		return () => {
			ws.removeEventListener('open', handleOpen);
			ws.removeEventListener('message', handleMessage);
			ws.removeEventListener('error', handleError);
			ws.removeEventListener('close', handleClose);
			ws.close();
		};
	}, [wsUrl, handleOpen, handleMessage, handleError, handleClose]);

	return {
		signalData,
		isConnected,
		error,
	};
}
