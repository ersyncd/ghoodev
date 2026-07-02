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
	<meta name="google-site-verification" content="3qiu_AsNMYuU74QUBYdFEGRqgQ0vIRnVD4ugDtvIoQo" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
	<HeaderLayout />
	<MainLayout>
		{@render children()}
	</MainLayout>
	<FooterLayout />
</div>
