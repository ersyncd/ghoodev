import { error } from '@sveltejs/kit';
import { getPostBySlug, getPosts } from '$lib/server/blog';

export async function entries() {
	const posts = await getPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export async function load({ params }) {
	const post = await getPostBySlug(params.slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return { post };
} 