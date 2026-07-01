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
	let html = value
		.replace(/`([^`]+)`/g, (_, content) => `<code class="rounded bg-zinc-800/50 px-1.5 py-0.5 font-mono text-sm text-zinc-200">${escapeHtml(content)}</code>`)
		.replace(/\*\*([^*]+)\*\*/g, (_, content) => `<strong class="font-semibold text-zinc-50">${escapeHtml(content)}</strong>`)
		.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, (_, before, content) => `${before}<em class="italic text-zinc-300">${escapeHtml(content)}</em>`)
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => 
			`<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer" class="text-blue-400 underline decoration-blue-400/30 underline-offset-2 transition-colors hover:text-blue-300 hover:decoration-blue-300/50">${escapeHtml(text)}</a>`
		)
		.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => 
			`<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" class="my-6 rounded-lg border border-zinc-800" loading="lazy" />`
		);
	
	return html;
};

export function renderMarkdown(markdown: string) {
	const lines = markdown.replace(/\r\n/g, '\n').split('\n');
	const blocks: string[] = [];
	let index = 0;

	const pushParagraph = (content: string[]) => {
		const text = content.join(' ').trim();
		if (text) {
			blocks.push(`<p class="mb-6 leading-8 text-zinc-300">${renderInline(text)}</p>`);
		}
	};

	while (index < lines.length) {
		const line = lines[index];

		if (!line.trim()) {
			index += 1;
			continue;
		}

		// Code block
		if (line.startsWith('```')) {
			const language = line.slice(3).trim();
			index += 1;
			const codeLines: string[] = [];

			while (index < lines.length && !lines[index].startsWith('```')) {
				codeLines.push(lines[index]);
				index += 1;
			}

			blocks.push(
				`<pre class="mb-6 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"><code${language ? ` data-language="${escapeHtml(language)}"` : ''} class="font-mono text-sm text-zinc-200">${escapeHtml(codeLines.join('\n'))}</code></pre>`
			);
			index += 1;
			continue;
		}

		// Headings
		if (/^#{1,6}\s/.test(line)) {
			const level = line.match(/^#{1,6}/)?.[0].length ?? 1;
			const text = line.replace(/^#{1,6}\s+/, '');
			const classes = {
				1: 'mb-6 mt-12 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl',
				2: 'mb-4 mt-10 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl',
				3: 'mb-3 mt-8 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl',
				4: 'mb-2 mt-6 text-lg font-semibold tracking-tight text-zinc-50',
				5: 'mb-2 mt-4 text-base font-semibold tracking-tight text-zinc-50',
				6: 'mb-2 mt-4 text-sm font-semibold tracking-tight text-zinc-50'
			};
			blocks.push(`<h${level} class="${classes[level as keyof typeof classes] || classes[2]}">${renderInline(text)}</h${level}>`);
			index += 1;
			continue;
		}

		// Blockquote
		if (/^>\s?/.test(line)) {
			const quoteLines: string[] = [];
			while (index < lines.length && /^>\s?/.test(lines[index])) {
				quoteLines.push(lines[index].replace(/^>\s?/, ''));
				index += 1;
			}
			blocks.push(`<blockquote class="mb-6 border-l-4 border-blue-400/50 bg-zinc-800/30 pl-4 py-1 italic text-zinc-400">${renderInline(quoteLines.join(' '))}</blockquote>`);
			continue;
		}

		// Unordered list
		if (/^[-*+]\s/.test(line)) {
			const items: string[] = [];
			while (index < lines.length && /^[-*+]\s/.test(lines[index])) {
				const content = lines[index].replace(/^[-*+]\s+/, '');
				items.push(`<li class="relative pl-6 before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:rounded-full before:bg-zinc-500">${renderInline(content)}</li>`);
				index += 1;
			}
			blocks.push(`<ul class="mb-6 space-y-2 text-zinc-300">${items.join('')}</ul>`);
			continue;
		}

		// Ordered list
		if (/^\d+\.\s/.test(line)) {
			const items: string[] = [];
			let counter = 0;
			while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
				counter += 1;
				const content = lines[index].replace(/^\d+\.\s+/, '');
				items.push(`<li class="relative pl-8 before:absolute before:left-0 before:font-mono before:text-sm before:text-zinc-500">${renderInline(content)}</li>`);
				index += 1;
			}
			blocks.push(`<ol class="mb-6 space-y-2 text-zinc-300" style="counter-reset: list-item ${items.length - items.length}">${items.join('')}</ol>`);
			continue;
		}

		// Horizontal rule
		if (/^---$/.test(line) || /^\*\*\*$/.test(line) || /^___$/.test(line)) {
			blocks.push(`<hr class="my-8 border-zinc-800" />`);
			index += 1;
			continue;
		}

		// Table
		if (line.includes('|') && line.trim().startsWith('|')) {
			const tableRows: string[][] = [];
			let isHeader = true;
			let hasSeparator = false;

			while (index < lines.length && lines[index].includes('|')) {
				const row = lines[index]
					.split('|')
					.map(cell => cell.trim())
					.filter(cell => cell !== '');
				
				if (row.length === 0) {
					index += 1;
					continue;
				}

				// Check if it's a separator row (e.g., |---|---|)
				if (row.every(cell => /^[-:]+$/.test(cell))) {
					hasSeparator = true;
					index += 1;
					continue;
				}

				tableRows.push(row);
				index += 1;
			}

			if (tableRows.length > 0) {
				let tableHtml = `<div class="mb-6 overflow-x-auto"><table class="min-w-full border-collapse border border-zinc-800 text-sm">`;
				
				// Header
				if (hasSeparator && tableRows.length > 0) {
					tableHtml += `<thead><tr class="border-b border-zinc-800 bg-zinc-900/50">`;
					tableRows[0].forEach(cell => {
						tableHtml += `<th class="px-4 py-2 text-left font-semibold text-zinc-200">${renderInline(cell)}</th>`;
					});
					tableHtml += `</tr></thead><tbody>`;
					
					// Body
					for (let i = 1; i < tableRows.length; i++) {
						tableHtml += `<tr class="border-b border-zinc-800/50">`;
						tableRows[i].forEach(cell => {
							tableHtml += `<td class="px-4 py-2 text-zinc-300">${renderInline(cell)}</td>`;
						});
						tableHtml += `</tr>`;
					}
					tableHtml += `</tbody>`;
				} else {
					// No header, just body
					tableHtml += `<tbody>`;
					tableRows.forEach(row => {
						tableHtml += `<tr class="border-b border-zinc-800/50">`;
						row.forEach(cell => {
							tableHtml += `<td class="px-4 py-2 text-zinc-300">${renderInline(cell)}</td>`;
						});
						tableHtml += `</tr>`;
					});
					tableHtml += `</tbody>`;
				}
				
				tableHtml += `</table></div>`;
				blocks.push(tableHtml);
			}
			continue;
		}

		// Paragraph
		const paragraphLines = [line];
		index += 1;
		while (
			index < lines.length &&
			lines[index].trim() &&
			!/^#{1,6}\s/.test(lines[index]) &&
			!/^>\s?/.test(lines[index]) &&
			!/^[-*+]\s/.test(lines[index]) &&
			!/^\d+\.\s/.test(lines[index]) &&
			!lines[index].startsWith('```') &&
			!/^---$/.test(lines[index]) &&
			!/^\*\*\*$/.test(lines[index]) &&
			!/^___$/.test(lines[index]) &&
			!lines[index].includes('|')
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