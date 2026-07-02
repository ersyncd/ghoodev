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

	<!-- Preconnect to Google Fonts (saves ~150ms) -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />

	<!-- 
		Preload ONLY the font weight used for LCP text.
		If your hero heading uses Inter 700, change the URL to bold variant.
		Current preload is for regular (400) – adjust as needed.
	-->
	<link
		rel="preload"
		href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZg.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>

	<!-- 
		Load Google Fonts normally (without media="print").
		display=swap ensures text is visible immediately with fallback.
	-->
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
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
