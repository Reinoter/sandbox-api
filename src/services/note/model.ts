import Entity from '@shared/models/entity';

export const NoteID = 'Note';
interface Note extends Entity {
	title: string;
	content: string;
}

export default Note;
