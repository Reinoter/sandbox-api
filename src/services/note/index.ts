import { ServiceContext } from '@services';
import ServiceError from '@shared/utils/http-response-errors';
import HttpStatusCodes from 'http-status-codes';

import Note, { NoteID } from './model';
import NoteRepository from './repository';

export interface NoteQuery {}
class NoteService {
	async search(query: NoteQuery, _ctx: ServiceContext): Promise<Note[]> {
		const noteRepo = await NoteRepository;
		return noteRepo.find(query, null);
	}
	async create(noteParsedRequestData: Note, _ctx: ServiceContext): Promise<Note> {
		const noteRepo = await NoteRepository;
		return noteRepo.create(noteParsedRequestData);
	}
	async delete(noteId: string, ctx: ServiceContext) {
		const note = await this.loadById(noteId, ctx);
		await note.remove();
	}

	async loadById(id: string, _ctx: ServiceContext): Promise<Note> {
		const noteRepo = await NoteRepository;
		const note = await noteRepo.findById(id);
		if (!note) {
			throw new ServiceError(
				HttpStatusCodes.BAD_REQUEST,
				'invalid_note',
				"We couldn't find the note you were looking for"
			);
		}
		return note;
	}
	async update(newNoteData: Note, ctx: ServiceContext) {
		const note = await this.loadById(newNoteData._id, ctx);
		const noteRepo = await NoteRepository;
		return (await noteRepo.findOneAndUpdate({ _id: note._id }, newNoteData, {
			new: true,
		})) as Note;
	}
}

export default new NoteService();
export { Note, NoteID };
export { default as router } from './controller';
