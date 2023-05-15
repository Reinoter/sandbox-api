import { log } from '@shared/utils/logger';
import config from 'config';
import http from 'http';

import app, { ServerConfig } from './app';
const serverConfig: ServerConfig = config.get('server');

async function runWebServer() {
	const expressApp = await app;
	const httpServer = http.createServer(expressApp);
	httpServer.listen(serverConfig.port, () => {
		log.info('Express server started on port: ' + serverConfig.port);
	});
	return httpServer;
}

const server = runWebServer();
export default server;
