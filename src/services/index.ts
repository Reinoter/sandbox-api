import { EntityReference } from '@shared/models/entity';
export interface ServiceContext {
	userRef?: EntityReference;
	queryOptions?: any;
	admin?: boolean;
}
