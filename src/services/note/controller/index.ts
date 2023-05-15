import { Request, Response, Router } from 'express';

import NoteService from './../index';
const router = Router();
import ServiceError from '@shared/utils/http-response-errors';
import HttpStatusCodes from 'http-status-codes';

import { buildNoteResponse, parseNoteQuery, parseNoteRequest } from './transformer';

router.get('/', async (req: Request, res: Response) => {
	const query = parseNoteQuery(req.query);
	const notes = (await NoteService.search(query, {}))?.map(el => buildNoteResponse(el));
	res.status(HttpStatusCodes.OK).send(notes);
});
router.get('/:id', async (req: Request, res: Response) => {
	const note = await NoteService.loadById(req.params.id, {});
	if (!note) {
		throw new ServiceError(
			HttpStatusCodes.NOT_FOUND,
			'unkown_resource',
			'Did not find the resource you were trying to fetch.'
		);
	}
	res.status(HttpStatusCodes.OK).send(buildNoteResponse(note));
});

router.put('/', async (req: Request, res: Response) => {
	const inputNote = parseNoteRequest(req.body);
	try {
		const updatedNote = await NoteService.update(inputNote, {});
		res.status(HttpStatusCodes.OK).send(buildNoteResponse(updatedNote));
	} catch (e) {
		throw new ServiceError(HttpStatusCodes.NOT_FOUND, 'server_error', 'We were not able to update this note.');
	}
});

router.post('/', async (req: Request, res: Response) => {
	const note = await NoteService.create(parseNoteRequest(req.body), {});
	res.status(HttpStatusCodes.OK).send(buildNoteResponse(note));
});

router.delete('/:noteId', async (req: Request, res: Response) => {
	await NoteService.delete(req.params.noteId, {});
	res.status(HttpStatusCodes.OK).send();
});

export default router;
