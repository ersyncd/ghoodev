<script lang="ts">
	import { sections } from '@/lib/stores/scroll';
	import {
		ArrowRight,
		CodeXml,
		Database,
		ExternalLink,
		Github,
		Linkedin,
		LogIn,
		Mail,
		Zap
	} from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let heroSection: HTMLElement;
	let aboutSection: HTMLElement;
	let skillsSection: HTMLElement;
	let projectsSection: HTMLElement;
	let blogSection: HTMLElement;
	let contactSection: HTMLElement;

	const skills = [
		{
			label: 'Frontend',
			icon: CodeXml,
			description:
				'SvelteKit, Next.js, TypeScript, Tailwind CSS, responsive interfaces, and accessible component systems.',
			items: ['SvelteKit', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Accessibility']
		},
		{
			label: 'Backend',
			icon: Database,
			description:
				'API integration, data shaping, deployment-ready app structure, and the small pieces that keep products reliable.',
			items: ['Node.js', 'REST APIs', 'Data modeling', 'System architecture', 'Payload design']
		},
		{
			label: 'DevOps / Tools',
			icon: Zap,
			description:
				'Tools and workflows that keep builds predictable, releases tidy, and feedback loops short.',
			items: ['Git', 'Vite', 'CI checks', 'Performance review', 'Deployment hygiene']
		},
		{
			label: 'Hardware / IoT Nodes',
			icon: Zap,
			description:
				'ESP32, Arduino, PlatformIO, and the kind of hardware integrations that connect physical input to web output.',
			items: ['ESP32', 'Arduino', 'PlatformIO', 'MQTT', 'Hardware telemetry']
		}
	];

	const projects = [
		{
			title: 'adshotel',
			image: '/adshotel.webp',
			description:
				'A hotel-facing admin system with structured content flows, clear dashboards, and a straightforward control surface.',
			stack: ['Laravel', 'React', 'Filament CMS'],
			live: 'https://github.com/ersyncd/adshotel/tree/dev',
			repo: 'https://github.com/ersyncd/adshotel/'
		},
		{
			title: 'electro-tools',
			image: '/electro-tools.webp',
			description:
				'A focused utility site built around quick lookup, compact interactions, and a layout that stays readable on small screens.',
			stack: ['React', 'TypeScript', 'Tailwind CSS'],
			live: 'https://electro-tools.vercel.app/',
			repo: 'https://github.com/ersyncd/electro-tools'
		},
		{
			title: 'simply-ai',
			image: '/simply-ai.webp',
			description:
				'An AI-oriented interface with a compact presentation layer and a clean reading order for the main workflow.',
			stack: ['React', 'API integration', 'Tailwind CSS'],
			live: 'https://simply-ai-six.vercel.app/',
			repo: 'https://github.com/ersyncd/SimplyAI'
		}
	];

	onMount(() => {
		sections.set({
			heroSection,
			aboutSection,
			skillsSection,
			projectsSection,
			blogSection,
			contactSection
		});
	});

	const scrollToSection = (name: string) => {
		const currentSections = get(sections);
		currentSections[name]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
</script>

<svelte:head>
	<title>Teguh Ersyarudin | Full-Stack Web Developer</title>
	<meta
		name="description"
		content="Portfolio of Teguh Ersyarudin, a full-stack web developer and electrical engineering student focused on SvelteKit, Next.js, TypeScript, system architecture, and hardware integrations."
	/>
</svelte:head>

<div class="bg-zinc-950 text-zinc-100">
	<section
		id="hero"
		bind:this={heroSection}
		class="relative overflow-hidden border-b border-zinc-800/70 px-6 py-20 lg:px-8 lg:py-16"
	>
		<div
			class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,#09090b_0%,#000000_100%)]"
		></div>
		<div
			class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20"
		></div>

		<div class="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
			<div class="max-w-3xl space-y-8">
				<div
					class="flex flex-wrap items-center gap-3 text-[0.65rem] font-medium tracking-[0.35em] text-zinc-500 uppercase"
				>
					<span
						class="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-zinc-300"
					>
						<span class="relative flex size-2">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
							></span>
							<span class="relative inline-flex size-2 rounded-full bg-green-500"></span>
						</span>
						Available for work
					</span>
					<span class="hidden h-px w-12 bg-zinc-800 sm:block"></span>
					<span>Web systems · hardware · clean delivery</span>
				</div>

				<div class="space-y-5">
					<p class="font-mono text-sm tracking-[0.35em] text-zinc-500 uppercase">ersyncd</p>
					<h1
						class="max-w-3xl text-4xl font-semibold tracking-tight text-balance text-zinc-50 sm:text-6xl lg:text-7xl"
					>
						Teguh Ersyarudin.
						<span class="block text-zinc-400"
							>Full-Stack Web Developer &amp; Electrical Engineering Student.</span
						>
					</h1>
					<p class="max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
						I build SvelteKit and Next.js interfaces, shape the systems behind them, and keep a foot
						in the hardware side through Arduino, PlatformIO, and ESP32 work.
					</p>
				</div>

				<div class="flex flex-wrap gap-3">
					<button
						type="button"
						onclick={() => scrollToSection('projectsSection')}
						class="inline-flex h-12 items-center gap-3 rounded-full bg-zinc-50 px-5 text-sm font-medium text-zinc-950 transition-transform hover:scale-[1.01]"
					>
						View work
						<ArrowRight class="h-4 w-4" />
					</button>
					<button
						type="button"
						onclick={() => scrollToSection('contactSection')}
						class="inline-flex h-12 items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/40 px-5 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-900/70 hover:text-zinc-50"
					>
						<LogIn class="h-4 w-4" />
						Reach out
					</button>
					<a
						href="/blogs"
						class="inline-flex h-12 items-center gap-3 rounded-full border border-zinc-800 px-5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50"
					>
						Read blogs
						<ExternalLink class="h-4 w-4" />
					</a>
				</div>

				<div class="grid gap-4 pt-4 sm:grid-cols-3">
					<div class="border-b border-zinc-800 p-4">
						<p class="font-mono text-[0.65rem] tracking-[0.3em] text-zinc-500 uppercase">
							Core focus
						</p>
						<p class="mt-2 text-sm text-zinc-300">SvelteKit, TypeScript, system architecture</p>
					</div>
					<div class="border-b border-zinc-800 p-4">
						<p class="font-mono text-[0.65rem] tracking-[0.3em] text-zinc-500 uppercase">
							Hardware
						</p>
						<p class="mt-2 text-sm text-zinc-300">ESP32, Arduino, PlatformIO</p>
					</div>
					<div class="border-b border-zinc-800 p-4">
						<p class="font-mono text-[0.65rem] tracking-[0.3em] text-zinc-500 uppercase">
							Delivery
						</p>
						<p class="mt-2 text-sm text-zinc-300">
							Readable UI, predictable structure, clean handoff
						</p>
					</div>
				</div>
			</div>

			<div class="hidden lg:block">
				<div
					class="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-6 shadow-2xl shadow-black/60 backdrop-blur-sm"
				>
					<div class="flex items-center justify-between border-b border-zinc-800 pb-5">
						<div>
							<p class="font-mono text-[0.65rem] tracking-[0.3em] text-zinc-500 uppercase">
								Profile
							</p>
							<p class="mt-1 text-xl font-semibold text-zinc-100">Teguh Ersyarudin</p>
						</div>
						<p
							class="rounded-full border border-zinc-800 px-3 py-1 font-mono text-[0.65rem] tracking-[0.2em] text-zinc-400 uppercase"
						>
							ersyncd
						</p>
					</div>

					<div class="grid gap-3 py-5 sm:grid-cols-2">
						<div class="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
							<p class="font-mono text-[0.65rem] tracking-[0.25em] text-zinc-500 uppercase">Web</p>
							<p class="mt-2 text-sm text-zinc-300">
								Product interfaces and maintainable app structure
							</p>
						</div>
						<div class="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
							<p class="font-mono text-[0.65rem] tracking-[0.25em] text-zinc-500 uppercase">
								Hardware
							</p>
							<p class="mt-2 text-sm text-zinc-300">
								Embedded work that stays connected to the web layer
							</p>
						</div>
					</div>

					<div
						class="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 to-zinc-900/40 p-4"
					>
						<p class="font-mono text-[0.65rem] tracking-[0.25em] text-zinc-500 uppercase">
							Working style
						</p>
						<p class="mt-2 text-sm leading-7 text-zinc-400">
							Keep the structure small, the data clear, and the interface quiet. If the codebase
							gets hard to read, the product gets harder to trust.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section
		id="about"
		bind:this={aboutSection}
		class="border-b border-zinc-800 px-6 py-20 lg:px-8 lg:py-28"
	>
		<div class="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.35fr_1fr] lg:gap-12">
			<p class="font-mono text-[0.7rem] tracking-[0.35em] text-zinc-500 uppercase">About</p>
			<div class="max-w-4xl space-y-6">
				<h2 class="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
					I work across the web stack and the device layer.
				</h2>
				<p class="text-lg leading-8 text-zinc-300">
					Most of my work sits where application logic, clean interfaces, and system planning
					overlap. I care about shipping software that is easy to read, easy to maintain, and honest
					about what it does.
				</p>
				<div class="grid gap-6 border-t border-zinc-800 pt-6 sm:grid-cols-2">
					<p class="leading-8 text-zinc-400">
						On the web side, I spend most of my time in SvelteKit, Next.js, and TypeScript. I like
						clear routing, small components, and layout decisions that hold up when the app grows.
					</p>
					<p class="leading-8 text-zinc-400">
						Outside the browser, I work with Arduino, PlatformIO, and ESP32 projects. That makes the
						hardware side practical for me, not separate from the software side.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section
		id="skills"
		bind:this={skillsSection}
		class="border-b border-zinc-800 px-6 py-20 lg:px-8 lg:py-28"
	>
		<div class="mx-auto w-full max-w-7xl space-y-10">
			<div class="max-w-2xl space-y-4">
				<p class="font-mono text-[0.7rem] tracking-[0.35em] text-zinc-500 uppercase">Skills</p>
				<h2 class="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
					Skills and tools I use to build web systems and connected devices.
				</h2>
			</div>

			<div class="grid gap-4 lg:grid-cols-2">
				{#each skills as skill, index}
					<div
						class="group border-l border-zinc-800 p-6 transition-colors hover:border-zinc-700 hover:bg-zinc-900/50"
					>
						<div class="flex items-start justify-between gap-6">
							<div class="space-y-3">
								<div
									class="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-zinc-200 transition-colors group-hover:border-zinc-700"
								>
									<svelte:component this={skill.icon} class="h-5 w-5" />
								</div>
								<h3 class="text-xl font-semibold text-zinc-50">{skill.label}</h3>
								<p class="max-w-xl leading-7 text-zinc-400">{skill.description}</p>
							</div>
							<div class="hidden text-xs text-zinc-500 sm:block">0{index + 1}</div>
						</div>
						<div class="mt-5 flex flex-wrap gap-2">
							{#each skill.items as item}
								<span
									class="rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1 text-xs text-zinc-300"
								>
									{item}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section
		id="projects"
		bind:this={projectsSection}
		class="border-b border-zinc-800 px-6 py-20 lg:px-8 lg:py-28"
	>
		<div class="mx-auto w-full max-w-7xl space-y-10">
			<div class="max-w-2xl space-y-4">
				<p class="font-mono text-[0.7rem] tracking-[0.35em] text-zinc-500 uppercase">Projects</p>
				<h2 class="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
					Selected work that shows the full stack in action.
				</h2>
			</div>

			<div class="grid gap-6 lg:grid-cols-3">
				{#each projects as project}
					<article class="group flex flex-col p-4 transition-all duration-300">
						<div class="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
							<img
								src={project.image}
								alt={project.title}
								class="aspect-video h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
							/>
						</div>

						<div class="flex flex-1 flex-col justify-between gap-6 p-2 pt-5">
							<div class="space-y-3">
								<h3 class="text-xl font-semibold tracking-tight text-zinc-50">{project.title}</h3>
								<p class="leading-7 text-zinc-400">{project.description}</p>
							</div>

							<div class="space-y-4">
								<div class="flex flex-wrap gap-2">
									{#each project.stack as item}
										<span
											class="rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1 text-xs text-zinc-300"
										>
											{item}
										</span>
									{/each}
								</div>

								<div class="flex flex-wrap gap-3 border-t border-zinc-800 pt-4 text-sm">
									<a
										href={project.live}
										target="_blank"
										rel="noreferrer"
										class="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100"
									>
										<ExternalLink class="h-4 w-4" />
										Live
									</a>
									<a
										href={project.repo}
										target="_blank"
										rel="noreferrer"
										class="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-100"
									>
										<Github class="h-4 w-4" />
										Repository
									</a>
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section
		id="blog"
		bind:this={blogSection}
		class="border-b border-zinc-800 px-6 py-20 lg:px-8 lg:py-28"
	>
		<div class="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.35fr_1fr] lg:gap-12">
			<p class="font-mono text-[0.7rem] tracking-[0.35em] text-zinc-500 uppercase">Blog</p>
			<div class="max-w-4xl space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/25 p-6">
				<div class="space-y-3">
					<h2 class="text-3xl font-semibold tracking-tight text-zinc-50">
						Short notes and technical logs.
					</h2>
					<p class="max-w-2xl leading-8 text-zinc-400">
						The blog is automated from markdown files in `src/lib/posts/`. It stays small on
						purpose: title, date, tags, description, and the body content.
					</p>
				</div>

				<a
					href="/blogs"
					class="inline-flex items-center gap-3 text-sm text-zinc-200 transition-colors hover:text-zinc-50"
				>
					Open blogs
					<ArrowRight class="h-4 w-4" />
				</a>
			</div>
		</div>
	</section>

	<section id="contact" bind:this={contactSection} class="px-6 py-20 lg:px-8 lg:py-28">
		<div
			class="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
		>
			<div class="max-w-3xl space-y-5">
				<p class="font-mono text-[0.7rem] tracking-[0.35em] text-zinc-500 uppercase">Contact</p>
				<h2 class="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
					If the work fits, let’s talk.
				</h2>
				<p class="max-w-2xl leading-8 text-zinc-400">
					I’m open to projects around product interfaces, system architecture, and
					hardware-connected builds.
				</p>
			</div>

			<div class="flex flex-wrap gap-3">
				<a
					href="mailto:teguhersyarudin@gmail.com"
					class="inline-flex h-12 items-center gap-3 rounded-full bg-zinc-50 px-5 text-sm font-medium text-zinc-950 transition-transform hover:scale-[1.01]"
				>
					<Mail class="h-4 w-4" />
					Email
				</a>
				<a
					href="https://github.com/ersyncd"
					target="_blank"
					rel="noreferrer"
					class="inline-flex h-12 items-center gap-3 rounded-full border border-zinc-800 px-5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50"
				>
					<Github class="h-4 w-4" />
					GitHub
				</a>
				<a
					href="https://www.linkedin.com/in/teguh-ersyarudin-aab190322"
					target="_blank"
					rel="noreferrer"
					class="inline-flex h-12 items-center gap-3 rounded-full border border-zinc-800 px-5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50"
				>
					<Linkedin class="h-4 w-4" />
					LinkedIn
				</a>
			</div>
		</div>
	</section>
</div>
