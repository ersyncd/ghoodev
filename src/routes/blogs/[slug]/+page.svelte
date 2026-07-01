<script lang="ts">
	type BlogPost = {
		slug: string;
		title: string;
		date: string;
		description: string;
		tags: string[];
		formattedDate: string;
		raw: string;
		content: string;
	};

	let { data } = $props<{ data: { post: BlogPost } }>();
</script>

<svelte:head>
	<title>{data.post.title} | Teguh Ersyarudin</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="mx-auto w-full max-w-3xl px-6 py-12 lg:px-8">
	<div class="space-y-5 border-b border-zinc-800 pb-8">
		<a href="/blogs" class="text-sm text-zinc-500 transition-colors hover:text-zinc-100">← Back to blogs</a>
		<div class="space-y-4">
			<p class="font-mono text-[0.7rem] tracking-[0.35em] text-zinc-500 uppercase">
				{data.post.formattedDate}
			</p>
			<h1 class="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
				{data.post.title}
			</h1>
			<p class="max-w-2xl text-base leading-relaxed text-zinc-400">{data.post.description}</p>
		</div>

		{#if data.post.tags.length}
			<div class="flex flex-wrap gap-2">
				{#each data.post.tags as tag}
					<span class="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-300">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="prose-shell pt-10 text-[1.02rem] leading-8">
		{@html data.post.content}
	</div>
</article>