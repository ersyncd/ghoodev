<script>
	export let data;
	console.log(data.posts[0]);
</script>

<h1>My Blog</h1>
<ul class="mt-40 h-100 w-100 bg-red-500">
	{#each data.posts as post}
		<li class="text-2xl text-black">
			<a href="/blog/{post.slug}">{post.title}</a>
			<small class="text-black">{post.date}</small>
		</li>
	{/each}
</ul>
