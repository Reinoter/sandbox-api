import config from 'config';
import { Response } from 'express';

const { level } = config.get('logger');
import pino from 'pino';

let pinoConfig: any;
switch (level) {
	case 'dev':
		pinoConfig = {
			transport: {
				target: 'pino-pretty',
			},
			serializers: {
				req: () => {},
				res: (res: Response) => ({
					statusCode: res.statusCode,
				}),
			},
			autoLogging: true,
			level: 'debug',
		};
		break;

	case 'test':
		pinoConfig = {
			enabled: false,
		};
		break;

	default:
		pinoConfig = {
			serializers: {
				req: (req: any) => ({
					id: req.id,
					method: req.method,
					url: req.url,
				}),
				res: (res: any) => ({
					statusCode: res.statusCode,
				}),
			},
			autoLogging: true,
			level: 'info',
		};
		break;
}

export function buildLogger(name: string) {
	return pino({ name, ...pinoConfig });
}

export const loggerHTTP = require('pino-http')(pinoConfig);
export const log = pino(pinoConfig);
