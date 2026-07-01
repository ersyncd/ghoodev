export type BlogPostMeta = {
	title: string;
	date: string;
	description: string;
	tags: string[];
};

export type BlogPostSummary = BlogPostMeta & {
	slug: string;
	formattedDate: string;
};

export type BlogPost = BlogPostSummary & {
	raw: string;
	content: string;
};

type PostFileLoader = () => Promise<string>;

const postFiles = import.meta.glob('/src/lib/posts/*.md', { query: '?raw', import: 'default' }) as Record<
	string,
	PostFileLoader
>;

const stripExtension = (path: string) => path.split('/').at(-1)?.replace(/\.md$/, '') ?? '';

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const formatDate = (value: string) => {
	const parsed = new Date(value);

	if (Number.isNaN(parsed.getTime())) {
		return value;
	}

	return new Intl.DateTimeFormat('en', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(parsed);
};

const parseTags = (value: string) =>
	value
		.split(',')
		.map((tag) => tag.trim())
		.filter(Boolean);

function parseFrontmatter(raw: string) {
	const normalized = raw.replace(/\r\n/g, '\n');
	const lines = normalized.split('\n');

	if (lines[0]?.trim() !== '---') {
		return {
			frontmatter: {
				title: 'Untitled post',
				date: new Date().toISOString(),
				description: '',
				tags: [] as string[]
			},
			body: normalized.trim()
		};
	}

	let cursor = 1;
	const frontmatterLines: string[] = [];

	while (cursor < lines.length && lines[cursor].trim() !== '---') {
		frontmatterLines.push(lines[cursor]);
		cursor += 1;
	}

	const body = lines.slice(cursor + 1).join('\n').trim();
	const frontmatter = frontmatterLines.reduce(
		(acc, line) => {
			const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
			if (!match) {
				return acc;
			}

			const [, key, value] = match;
			const normalizedValue = value.trim();

			if (key === 'tags') {
				acc.tags = normalizedValue.startsWith('[') && normalizedValue.endsWith(']')
					? parseTags(normalizedValue.slice(1, -1))
					: parseTags(normalizedValue);
				return acc;
			}

			if (key === 'title' || key === 'date' || key === 'description') {
				acc[key] = normalizedValue.replace(/^['"]|['"]$/g, '');
			}

			return acc;
		},
		{
			title: 'Untitled post',
			date: new Date().toISOString(),
			description: '',
			tags: [] as string[]
		}
	);

	return {
		frontmatter,
		body
	};
}

const renderInline = (value: string) => {
	let html = escapeHtml(value);
	html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
	html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	html = html.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, '$1<em>$2</em>');
	html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
	return html;
};

export function renderMarkdown(markdown: string) {
	const lines = markdown.replace(/\r\n/g, '\n').split('\n');
	const blocks: string[] = [];
	let index = 0;

	const pushParagraph = (content: string[]) => {
		const text = content.join(' ').trim();
		if (text) {
			blocks.push(`<p>${renderInline(text)}</p>`);
		}
	};

	while (index < lines.length) {
		const line = lines[index];

		if (!line.trim()) {
			index += 1;
			continue;
		}

		if (line.startsWith('```')) {
			const language = line.slice(3).trim();
			index += 1;
			const codeLines: string[] = [];

			while (index < lines.length && !lines[index].startsWith('```')) {
				codeLines.push(lines[index]);
				index += 1;
			}

			blocks.push(
				`<pre><code${language ? ` data-language="${escapeHtml(language)}"` : ''}>${escapeHtml(codeLines.join('\n'))}</code></pre>`
			);
			index += 1;
			continue;
		}

		if (/^#{1,6}\s/.test(line)) {
			const level = line.match(/^#{1,6}/)?.[0].length ?? 1;
			const text = line.replace(/^#{1,6}\s+/, '');
			blocks.push(`<h${level}>${renderInline(text)}</h${level}>`);
			index += 1;
			continue;
		}

		if (/^>\s?/.test(line)) {
			const quoteLines: string[] = [];
			while (index < lines.length && /^>\s?/.test(lines[index])) {
				quoteLines.push(lines[index].replace(/^>\s?/, ''));
				index += 1;
			}
			blocks.push(`<blockquote><p>${renderInline(quoteLines.join(' '))}</p></blockquote>`);
			continue;
		}

		if (/^[-*+]\s/.test(line)) {
			const items: string[] = [];
			while (index < lines.length && /^[-*+]\s/.test(lines[index])) {
				items.push(`<li>${renderInline(lines[index].replace(/^[-*+]\s+/, ''))}</li>`);
				index += 1;
			}
			blocks.push(`<ul>${items.join('')}</ul>`);
			continue;
		}

		if (/^\d+\.\s/.test(line)) {
			const items: string[] = [];
			while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
				items.push(`<li>${renderInline(lines[index].replace(/^\d+\.\s+/, ''))}</li>`);
				index += 1;
			}
			blocks.push(`<ol>${items.join('')}</ol>`);
			continue;
		}

		const paragraphLines = [line];
		index += 1;
		while (
			index < lines.length &&
			lines[index].trim() &&
			!/^#{1,6}\s/.test(lines[index]) &&
			!/^>\s?/.test(lines[index]) &&
			!/^[-*+]\s/.test(lines[index]) &&
			!/^\d+\.\s/.test(lines[index]) &&
			!lines[index].startsWith('```')
		) {
			paragraphLines.push(lines[index]);
			index += 1;
		}

		pushParagraph(paragraphLines);
	}

	return blocks.join('\n');
}

async function readPostEntries() {
	const entries = await Promise.all(
		Object.entries(postFiles).map(async ([path, loader]) => {
			const raw = await loader();
			const slug = stripExtension(path);
			const { frontmatter, body } = parseFrontmatter(raw);

			return {
				slug,
				raw,
				frontmatter,
				body
			};
		})
	);

	return entries.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export async function getPosts(): Promise<BlogPostSummary[]> {
	const posts = await readPostEntries();

	return posts.map(({ slug, frontmatter }) => ({
		slug,
		title: frontmatter.title,
		date: frontmatter.date,
		description: frontmatter.description,
		tags: frontmatter.tags,
		formattedDate: formatDate(frontmatter.date)
	}));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	const posts = await readPostEntries();
	const post = posts.find((entry) => entry.slug === slug);

	if (!post) {
		return null;
	}

	return {
		slug: post.slug,
		title: post.frontmatter.title,
		date: post.frontmatter.date,
		description: post.frontmatter.description,
		tags: post.frontmatter.tags,
		formattedDate: formatDate(post.frontmatter.date),
		raw: post.raw,
		content: renderMarkdown(post.body)
	};
}

export { formatDate };