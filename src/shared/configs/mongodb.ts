import config from 'config';
import mongoose, { Mongoose } from 'mongoose';
interface MongooseConfig {
	url: string;
	database: string;
	debug: boolean;
}

const mongooseConfig: MongooseConfig = config.get('mongoose');

mongoose.set('debug', mongooseConfig.debug);

const fullUrl = mongooseConfig.url + '/' + mongooseConfig.database;
let connection: Promise<Mongoose> = mongoose.connect(fullUrl);

export default connection;

export const connect = async () => {
	const newConnection = await mongoose.connect(fullUrl);
	connection = Promise.resolve(newConnection);
};

export const disconnect = async () => {
	await mongoose.connection.close();
	connection = Promise.reject();
};
