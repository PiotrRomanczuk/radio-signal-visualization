import { Server as HttpServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { generateSignal } from '../core/signal/SignalGenerator';
import {
	SIGNAL_LENGTH,
	MIN_VALUE,
	MAX_VALUE,
	UPDATE_INTERVAL,
} from '../config/constants';

export const createWebSocketServer = (server: HttpServer) => {
	const wss = new WebSocketServer({ server });

	wss.on('connection', (ws: WebSocket) => {
		console.log('New WebSocket client connected');
		ws.send(JSON.stringify({ message: 'WebSocket connection established' }));
	});

	const intervalId = setInterval(() => {
		const signalData = generateSignal(SIGNAL_LENGTH, MIN_VALUE, MAX_VALUE);
		const message = JSON.stringify(signalData);

		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(message);
			}
		});
	}, UPDATE_INTERVAL);

	return {
		close: () => {
			clearInterval(intervalId);
			wss.close();
		},
	};
};
