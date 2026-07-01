<script lang="ts">
	type BlogPostSummary = {
		slug: string;
		title: string;
		date: string;
		description: string;
		tags: string[];
		formattedDate: string;
	};

	let { data } = $props<{ data: { posts: BlogPostSummary[] } }>();
</script>

<svelte:head>
	<title>Blogs | Teguh Ersyarudin</title>
	<meta
		name="description"
		content="Minimal notes and articles about SvelteKit, TypeScript, system architecture, and hardware integration."
	/>
</svelte:head>

<section class="mx-auto w-full max-w-5xl px-6 py-12 lg:px-8">
	<div class="max-w-2xl space-y-4 pb-10">
		<p class="font-mono text-[0.7rem] tracking-[0.35em] text-zinc-500 uppercase">journal</p>
		<h1 class="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">Blogs</h1>
		<p class="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
			Short notes on the systems, tools, and hardware work I’m building around.
		</p>
	</div>

	<div class="divide-y divide-zinc-800 border-y border-zinc-800">
		{#each data.posts as post}
			<a
				href={`/blogs/${post.slug}`}
				class="group grid gap-4 py-6 transition-colors hover:bg-zinc-900/30 sm:grid-cols-[1fr_auto] sm:items-start"
			>
				<div class="space-y-2">
					<div class="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
						<span class="font-mono tracking-[0.2em] uppercase">{post.formattedDate}</span>
						{#if post.tags.length}
							<span class="h-px w-8 bg-zinc-700"></span>
							<div class="flex flex-wrap gap-2">
								{#each post.tags as tag}
									<span class="rounded-full border border-zinc-800 px-2.5 py-1 text-[0.65rem] text-zinc-400">
										{tag}
									</span>
								{/each}
							</div>
						{/if}
					</div>
					<h2 class="text-xl font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-white">
						{post.title}
					</h2>
					<p class="max-w-2xl text-sm leading-relaxed text-zinc-400">{post.description}</p>
				</div>

				<div class="flex items-center justify-end text-zinc-500 transition-colors group-hover:text-zinc-100">
					<span class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 text-sm">
						→
					</span>
				</div>
			</a>
		{/each}
	</div>
</section>