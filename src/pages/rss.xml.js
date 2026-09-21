import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const notes = (await getCollection('notes', (n) => !n.data.hidden)).sort(
		(a, b) => (b.data.updated ?? b.data.published).valueOf() - (a.data.updated ?? a.data.published).valueOf(),
	);
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
