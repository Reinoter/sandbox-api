import connection from '@shared/configs/mongodb';
import { Schema, SchemaTypes } from 'mongoose';
import { v4 } from 'uuid';

import Note, { NoteID } from './model';
export const NoteSchema = new Schema<Note>(
	{
		_id: { type: SchemaTypes.String, default: v4 },
		_type: { type: SchemaTypes.String, default: NoteID },
		title: SchemaTypes.String,
		content: SchemaTypes.String,
	},
	{ timestamps: true }
);

export default connection.then(database => database.models.Note || database.model<Note>(NoteID, NoteSchema));
