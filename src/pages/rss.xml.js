import rss from '@astrojs/rss';
import { getVisibleNotes } from '../lib/notes';

export async function GET(context) {
	const notes = await getVisibleNotes();
	return rss({
		title: 'walkclear',
		description: 'Notes on system design, written while I learn it.',
		site: context.site,
		items: notes.map((n) => ({
			title: n.data.title,
			description: n.data.summary,
			pubDate: n.data.updated ?? n.data.published,
			link: `/notes/${n.id}/`,
		})),
	});
}
