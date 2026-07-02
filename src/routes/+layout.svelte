<script lang="ts">
	import '../app.css';
	import FooterLayout from '../layouts/footer-layout.svelte';
	import HeaderLayout from '../layouts/header-layout.svelte';
	import MainLayout from '../layouts/main-layout.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Teguh Ersyarudin | Full-Stack Web Developer</title>
	<meta
		name="description"
		content="Teguh Ersyarudin, also known as ersyncd, is a full-stack web developer and electrical engineering student working on SvelteKit, Next.js, TypeScript, and hardware-integrated systems."
	/>
	<meta name="theme-color" content="#09090b" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<!-- Load Inter -->
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<!-- Load IBM Plex Mono -->
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
	<HeaderLayout />
	<MainLayout>
		{@render children()}
	</MainLayout>
	<FooterLayout />
</div>
