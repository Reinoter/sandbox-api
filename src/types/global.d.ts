import { EntityReference } from '@shared/models/entity';
interface Session {
	ref: EntityReference;
}
declare module 'mocha-axios';
declare global {
	declare namespace Express {
		export interface Request {
			session: Session;
		}
	}
}
