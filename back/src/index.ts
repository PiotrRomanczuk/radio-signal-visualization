import { createApp } from './infrastructure/server';
import { createWebSocketServer } from './services/WebSocketService';

const app = createApp();
createWebSocketServer(app.server);

app.listen();
