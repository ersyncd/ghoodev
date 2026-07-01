<script lang="ts">
	let { children } = $props();
</script>

<main class="relative z-0 flex min-h-[calc(100vh-0px)] flex-1 flex-col pt-20 sm:pt-24">
	{@render children()}
</main>
