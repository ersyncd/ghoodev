<script lang="ts">
	import { page } from '$app/state';
	import { sections } from '@/lib/stores/scroll';
	import { cn } from '@/lib/utils';
	import { Menu, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	const homeLinks = [
		{ label: 'About', target: 'aboutSection' },
		{ label: 'Skills', target: 'skillsSection' },
		{ label: 'Projects', target: 'projectsSection' },
		{ label: 'Blog', target: 'blogSection' },
		{ label: 'Contact', target: 'contactSection' }
	];

	const blogLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Blogs', href: '/blogs' }
	];

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	const closeMenu = () => {
		mobileMenuOpen = false;
	};

	const scrollToSection = (target: string, event: Event) => {
		event.preventDefault();
		const currentSections = get(sections);
		currentSections[target]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		closeMenu();
	};

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 8;
		};

		const handleResize = () => {
			if (window.innerWidth >= 768) {
				closeMenu();
			}
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<header
	class={cn(
		'fixed inset-x-0 top-0 z-40 border-b border-transparent transition-colors duration-300',
		scrolled && 'border-zinc-800/70 bg-zinc-950/85 backdrop-blur-xl'
	)}
>
	<div class="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
		<a href="/" class="group flex items-center gap-3">
			<span class="text-sm font-semibold tracking-[0.35em] text-zinc-100 uppercase">ersyncd</span>
			<span class="hidden h-px w-8 bg-zinc-700 transition-all duration-300 group-hover:w-12 sm:block"></span>
			<span class="text-xs text-zinc-500">teguh ersyarudin</span>
		</a>

		<nav class="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
			{#if page.url.pathname === '/'}
				{#each homeLinks as item}
					<button
						type="button"
						onclick={(event) => scrollToSection(item.target, event)}
						class="transition-colors hover:text-zinc-100"
					>
						{item.label}
					</button>
				{/each}
				<a href="/blogs" class="transition-colors hover:text-zinc-100">Blogs</a>
			{:else}
				{#each blogLinks as item}
					<a href={item.href} class="transition-colors hover:text-zinc-100">{item.label}</a>
				{/each}
			{/if}
		</nav>

		<button
			type="button"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-100 transition-colors hover:border-zinc-700 hover:bg-zinc-900 md:hidden"
			aria-expanded={mobileMenuOpen}
			aria-label="Toggle navigation"
		>
			{#if mobileMenuOpen}
				<X class="h-5 w-5" />
			{:else}
				<Menu class="h-5 w-5" />
			{/if}
		</button>
	</div>

	{#if mobileMenuOpen}
		<div class="border-t border-zinc-800/80 bg-zinc-950/95 px-6 py-5 backdrop-blur-xl md:hidden">
			<div class="mx-auto flex w-full max-w-7xl flex-col gap-4 text-sm text-zinc-300">
				{#if page.url.pathname === '/'}
					{#each homeLinks as item}
						<button
							type="button"
							onclick={(event) => scrollToSection(item.target, event)}
							class="flex items-center justify-between rounded-2xl border border-zinc-800/70 bg-zinc-900/30 px-4 py-3 text-left transition-colors hover:border-zinc-700 hover:bg-zinc-900/70"
						>
							<span>{item.label}</span>
							<span class="text-xs text-zinc-500">→</span>
						</button>
					{/each}
				{:else}
					{#each blogLinks as item}
						<a
							href={item.href}
							onclick={closeMenu}
							class="flex items-center justify-between rounded-2xl border border-zinc-800/70 bg-zinc-900/30 px-4 py-3 transition-colors hover:border-zinc-700 hover:bg-zinc-900/70"
						>
							<span>{item.label}</span>
							<span class="text-xs text-zinc-500">→</span>
						</a>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</header>
