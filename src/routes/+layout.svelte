<script lang="ts">
	import { cn } from '@/lib/utils';
	import '../app.css';
	import { onMount } from 'svelte';
	import { sections } from '@/lib/stores/scroll';
	import { get } from 'svelte/store';
	import { Menu, X } from '@lucide/svelte';

	let { children } = $props();
	let scrollY: number = $state(0);
	let onScroll: boolean = $state(false);
	let isOpen: boolean = $state(false);

	const scrollToSection = (name: string, event: Event) => {
		event.preventDefault();
		const currentSections = get(sections);
		currentSections[name]?.scrollIntoView({ behavior: 'smooth' });
		isOpen = false;
	};

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
			onScroll = scrollY > 0;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<svelte:head>
	<title>Personal Portfolio | Teguh Ersyarudin</title>
	<meta
		name="description"
		content="Personal portfolio of Teguh Ersyarudin — frontend developer specializing in Svelte, UI/UX, and responsive web apps. Explore projects, skills, and contact details."
	/>
</svelte:head>

<header
	class={cn(
		'fixed z-20 flex w-full items-center justify-between bg-white px-6 py-4 transition-all',
		onScroll && 'md:bg-white/60 md:shadow-sm md:backdrop-blur-sm'
	)}
>
	<!-- Logo -->
	<a
		href="#heroSection"
		onclick={(e) => scrollToSection('heroSection', e)}
		class="font-poppins text-2xl uppercase"
	>
		TE
	</a>

	<!-- Tombol Burger (Mobile) -->
	<button class="block md:hidden" onclick={() => (isOpen = !isOpen)}>
		{#if isOpen}
			<X class="h-6 w-6" />
		{:else}
			<Menu class="h-6 w-6" />
		{/if}
	</button>

	<!-- Navigation (Desktop) -->
	<nav class="hidden gap-12 text-sm md:flex">
		{#each [['aboutSection', 'About'], ['skillsSection', 'Skills'], ['projectsSection', 'Projects'], ['contactSection', 'Contact']] as [key, label]}
			<a
				href={'#' + key}
				onclick={(e) => scrollToSection(key, e)}
				class="text-neutral-600 transition-colors hover:text-neutral-800"
			>
				{label}
			</a>
		{/each}
	</nav>

	<!-- Navigation (Mobile Dropdown) -->
	{#if isOpen}
		<div
			class="animate-fade-in absolute top-full left-0 flex w-full flex-col items-center gap-4 bg-white py-6 shadow-md md:hidden"
		>
			{#each [['aboutSection', 'About'], ['skillsSection', 'Skills'], ['projectsSection', 'Projects'], ['contactSection', 'Contact']] as [key, label]}
				<button
					type="button"
					onclick={(e) => scrollToSection(key, e)}
					class="text-lg font-medium text-neutral-700 transition-colors hover:text-black"
				>
					{label}
				</button>
			{/each}
		</div>
	{/if}
</header>

<main class="min-h-screen w-full">
	{@render children()}
</main>
