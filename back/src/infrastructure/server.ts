import express, { Express, Request, Response } from 'express';
import http, { Server } from 'http';
import { DEFAULT_PORT } from '../config/constants';

export interface AppInstance {
	app: Express;
	server: Server;
	port: number | string;
	listen: () => void;
}

const setupRoutes = (app: Express): void => {
	app.get('/', (req: Request, res: Response) => {
		res.send('Server is running');
	});
};

export const createApp = (): AppInstance => {
	const app = express();
	const port = process.env.PORT || DEFAULT_PORT;
	const server = http.createServer(app);

	setupRoutes(app);

	const listen = (): void => {
		server.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	};

	return {
		app,
		server,
		port,
		listen,
	};
};
