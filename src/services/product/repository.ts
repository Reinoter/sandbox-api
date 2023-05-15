import connection from '@shared/configs/mongodb';
import { Schema, SchemaTypes } from 'mongoose';
import { v4 } from 'uuid';

import Product, { ProductID } from './model';
export const ProductSchema = new Schema<Product>(
	{
		_id: { type: SchemaTypes.String, default: v4 },
		_type: { type: SchemaTypes.String, default: ProductID },
		name: { type: SchemaTypes.String, required: true },
		description: { type: SchemaTypes.String, required: true },
	},
	{ timestamps: true }
);

export default connection.then(database => database.models.Product || database.model<Product>(ProductID, ProductSchema));
