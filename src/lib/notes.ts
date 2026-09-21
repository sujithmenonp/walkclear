import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

export const groups = [
	{ type: 'concept', label: 'Concepts' },
	{ type: 'problem', label: 'Problems' },
	{ type: 'tech', label: 'Technologies' },
] as const;

const lastTouched = (n: Note) => (n.data.updated ?? n.data.published).valueOf();

/** Visible (non-hidden) notes, most recently touched first. */
export async function getVisibleNotes() {
	const notes = await getCollection('notes', (n) => !n.data.hidden);
	return notes.sort((a, b) => lastTouched(b) - lastTouched(a));
}

/** Visible notes for one type, alphabetical (for navigation). */
export async function getNotesByType(type: Note['data']['type']) {
	const notes = await getVisibleNotes();
	return notes.filter((n) => n.data.type === type).sort((a, b) => a.data.title.localeCompare(b.data.title));
}
