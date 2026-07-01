import { getPosts } from '$lib/server/blog';

export async function load() {
	const posts = await getPosts();

	return { posts };
}