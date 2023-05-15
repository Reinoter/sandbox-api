import { Note, NoteQuery } from './../index';
export interface INote {
	sub?: string;
	title: string;
	content: string;
}

export const parseNoteRequest = (metadata: INote): any => {
	return {
		_id: metadata.sub,
		name: metadata.title,
		content: metadata.content,
	};
};
export const parseNoteQuery = (_metadata: any): NoteQuery => {
	const query = {};
	return query;
};

export const buildNoteResponse = (note: Note): INote => {
	return {
		sub: note._id,
		title: note.title,
		content: note.content,
	};
};
