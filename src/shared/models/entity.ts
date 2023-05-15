import { Document } from 'mongoose';

interface Entity extends Document {
	_id: string;
	_type: string;
	toJSON: () => JSON;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface EntityQueryOptions {
	session: any;
}

import { Schema, SchemaTypes } from 'mongoose';

interface EntityReference {
	id: string;
	type: string;
}

interface VaultReference extends EntityReference {
	version: number;
}

const getReference = (entity: any): EntityReference => {
	return {
		id: entity._id,
		type: entity._type,
	};
};
const getEntity = (ref?: EntityReference): any => {
	if (!ref) {
		return null;
	}
	return {
		_id: ref.id,
		_type: ref.type,
	};
};

const buildReference = (id: string, type: string): EntityReference => ({
	id,
	type,
});

const getRefSchema = () =>
	new Schema<EntityReference>(
		{
			id: { type: SchemaTypes.String, required: true },
			type: { type: SchemaTypes.String, required: true },
		},
		{ _id: false }
	);

const getVaultRefSchema = () =>
	new Schema<VaultReference>(
		{
			id: { type: SchemaTypes.String, required: true },
			version: { type: SchemaTypes.Number, required: true },
			type: { type: SchemaTypes.String, required: true },
		},
		{ _id: false }
	);

export default Entity;

export { buildReference, EntityReference, getEntity, getReference, getRefSchema, getVaultRefSchema, VaultReference };
