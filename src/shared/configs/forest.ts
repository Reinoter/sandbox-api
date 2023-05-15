import Database from '@shared/configs/mongodb';
import config from 'config';
import { Application } from 'express';
import forest from 'forest-express-mongoose';

interface ForestAdminConfig {
	env_secret: string;
	auth_secret: string;
	application_url: string;
}

const faConfig: ForestAdminConfig = config.get('forest-admin');

export const init = async (app: Application) => {
	const configDir = __dirname + '/../forest';
	return Database.then(mongoose =>
		forest.init({
			configDir,
			envSecret: faConfig.env_secret,
			authSecret: faConfig.auth_secret,
			objectMapping: mongoose,
			connections: { default: mongoose.connection },
		})
	).then(middleware => {
		app.use(middleware);
	});
};
