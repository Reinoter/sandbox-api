import 'express-async-errors';

import { router as forestRouter } from '@services/forest';
import { router as notesRouter } from '@services/note';
import { router as productRouter } from '@services/product';
import { init as initForest } from '@shared/configs/forest';
import { connect } from '@shared/configs/mongodb';
import { assets, ui } from '@shared/configs/swagger';
import { handleErrors } from '@shared/utils/http-response-errors';
import { log } from '@shared/utils/logger';
import cors from 'cors';
import express from 'express';
// import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';

export interface ServerConfig {
	protocol: string;
	host: string;
	port: number;
}

const app = express();
app.use(morgan('tiny'));
const whitelist: any[] = ['http://app.forestadmin.com', 'https://app.forestadmin.com'];

if (process.env.NODE_ENV !== 'production') {
	whitelist.push('http://localhost:3000');
}
const corsOptions = {
	credentials: true,
	origin: whitelist,
};

const corsConfig: any = cors(corsOptions);
app.use(corsConfig);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));

app.use('/api-docs', assets, ui);
app.use('/notes', notesRouter);
app.use('/forest', forestRouter);
app.use('/products', productRouter);

async function init() {
	log.info('Initializing Forestadmin');
	await initForest(app);

	await connect();
	log.info('Connected to Mongoose DB');
	app.use(handleErrors);
	return app;
}

export default init();
