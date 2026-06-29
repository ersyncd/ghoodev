import { getPosts } from '$lib/utils';

export async function load() {
  const posts = await getPosts();
  return { posts };
}