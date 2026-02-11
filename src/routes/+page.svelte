<script lang="ts">
	import { sections } from '@/lib/stores/scroll';
	import { onMount } from 'svelte';
	import {
		ArrowRight,
		Bot,
		CodeXml,
		Database,
		ExternalLink,
		Github,
		Instagram,
		Linkedin,
		Mail,
		Zap
	} from '@lucide/svelte';
	import { get } from 'svelte/store';

	let heroSection: HTMLElement;
	let aboutSection: HTMLElement;
	let skillsSection: HTMLElement;
	let projectsSection: HTMLElement;
	let contactSection: HTMLElement;

	onMount(() => {
		sections.set({ heroSection, aboutSection, skillsSection, projectsSection, contactSection });
	});

	const scrollToSection = (name: string) => {
		const currentSections = get(sections);
		currentSections[name]?.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<!-- Hero Section  -->
<section
	id="hero"
	bind:this={heroSection}
	class="relative flex min-h-screen items-center justify-center overflow-hidden"
>
	<div class="animate-fade-in relative z-10 container mx-auto">
		<div class="container mx-auto max-w-4xl text-center">
			<!-- SEO -->
			<h1 class="sr-only">Fullstack Developer, Creative Developer, & IoT Enthusiast</h1>

			<h2 class="mb-6 text-6xl font-bold text-black md:text-7xl lg:text-8xl">
				Hi, I'm Teguh Ersyarudin
			</h2>
			<p class="mx-auto mb-8 max-w-2xl text-xl text-neutral-600 md:text-2xl">
				Creative developer crafting beautiful digital experiences with modern technologies
			</p>

			<div class="flex flex-col justify-center gap-4 px-6 sm:flex-row">
				<button
					class="group focus-visible:ring-ring inline-flex h-11 items-center justify-center gap-2 rounded-md px-8 text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
					onclick={() => scrollToSection('projectsSection')}
				>
					View My Work
					<ArrowRight class="h-6 w-6 transition-all group-hover:translate-x-2" />
				</button>

				<button
					class="focus-visible:ring-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border bg-black px-8 text-sm font-medium text-white transition-colors hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:bg-white md:text-black"
					onclick={() => scrollToSection('contactSection')}
				>
					Get In Touch
				</button>
			</div>
		</div>
	</div>
</section>

<!-- About Section  -->
<section id="about" bind:this={aboutSection} class="bg-white py-24">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-3xl">
			<h2 class="mb-8 text-center text-4xl font-bold text-black md:text-5xl">About Me</h2>
			<div class="space-y-6 text-lg text-neutral-600">
				<p>
					I'm a passionate full-stack developer with over 3 years of experience building modern web
					applications. I specialize in creating intuitive user interfaces and scalable backend
					systems.
				</p>
				<p>
					My approach combines technical expertise with creative problem-solving to deliver
					solutions that not only work flawlessly but also delight users. I believe in writing
					clean, maintainable code and staying up-to-date with the latest technologies.
				</p>
				<p>
					When I'm not coding, I focus on new expertise—like IoT and electronics—contributing to
					open-source, and sketching ideas over coffee.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Skills Section  -->
<section id="skills" bind:this={skillsSection} class="bg-white py-24">
	<div class="container mx-auto px-6">
		<h2 class="mb-16 text-center text-4xl font-bold text-black md:text-5xl">Skills & Expertise</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<div
				class="group rounded-2xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
			>
				<div
					class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-200/50 transition-colors group-hover:bg-neutral-200"
				>
					<CodeXml class="h-7 w-7" />
				</div>
				<h3 class="mb-3 text-xl font-semibold text-black">Frontend Development</h3>
				<p class="text-neutral-600">React, TypeScript, Tailwind CSS, Next.js</p>
			</div>
			<div
				class="group rounded-2xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
			>
				<div
					class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-200/50 transition-colors group-hover:bg-neutral-200"
				>
					<Database class="h-7 w-7" />
				</div>
				<h3 class="mb-3 text-xl font-semibold text-black">Backend Development</h3>
				<p class="text-neutral-600">Node.js, PostgreSQL, REST APIs, GraphQL</p>
			</div>
			<div
				class="group rounded-2xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
			>
				<div
					class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-200/50 transition-colors group-hover:bg-neutral-200"
				>
					<Zap class="h-7 w-7" />
				</div>
				<h3 class="mb-3 text-xl font-semibold text-black">Performance</h3>
				<p class="text-neutral-600">Optimization, SEO, Accessibility, Best Practices</p>
			</div>
			<div
				class="group rounded-2xl p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg"
			>
				<div
					class="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-200/50 transition-colors group-hover:bg-neutral-200"
				>
					<Bot class="h-7 w-7" />
				</div>
				<h3 class="mb-3 text-xl font-semibold text-black">IoT Development</h3>
				<p class="text-neutral-600">ESP32, Arduino, MQTT, Firmware Connectivity</p>
			</div>
		</div>
	</div>
</section>

<!-- Projects Section  -->
<section id="projects" bind:this={projectsSection} class="bg-white py-24">
	<div class="container mx-auto px-6">
		<h2 class="mb-16 text-center text-4xl font-bold text-black md:text-5xl">Featured Projects</h2>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Project Card -->
			<div
				class="group overflow-hidden rounded-2xl bg-neutral-50 shadow-md transition-all duration-300 hover:shadow-xl"
			>
				<div class="relative aspect-square overflow-hidden">
					<img
						src="adshotel.webp"
						alt="Modern company profile"
						class="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div
						class="absolute inset-0 z-10 flex items-end justify-center gap-3 bg-linear-to-t from-black/70 to-transparent pb-6 opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
					>
						<a
							href="https://github.com/ersyncd/adshotel/"
							target="_blank"
							class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/80"
						>
							<ExternalLink class="h-4 w-4" />
							Demo
						</a>
						<a
							href="https://github.com/ersyncd/adshotel/tree/dev"
							target="_blank"
							class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/80"
						>
							<Github class="h-4 w-4" />
							Code
						</a>
					</div>
				</div>

				<div class="p-6">
					<h3 class="mb-2 text-xl font-semibold text-black">Modern Web App</h3>
					<p class="mb-4 text-gray-600">
						A full-stack web application with CMS features and clean UI.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">Laravel</span>
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">React</span>
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">Fillament</span>
					</div>
				</div>
			</div>

			<!-- Project Card -->
			<div
				class="group overflow-hidden rounded-2xl bg-neutral-50 shadow-md transition-all duration-300 hover:shadow-xl"
			>
				<div class="relative aspect-square overflow-hidden">
					<img
						src="electro-tools.webp"
						alt="Mobile Experience Design electrotools.vercel.app"
						class="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div
						class="absolute inset-0 z-10 flex items-end justify-center gap-3 bg-linear-to-t from-black/70 to-transparent pb-6 opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
					>
						<a
							href="https://electro-tools.vercel.app/"
							target="_blank"
							class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/80"
						>
							<ExternalLink class="h-4 w-4" />
							Demo
						</a>
						<a
							href="https://github.com/ersyncd/electro-tools"
							target="_blank"
							class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/80"
						>
							<Github class="h-4 w-4" />
							Code
						</a>
					</div>
				</div>

				<div class="p-6">
					<h3 class="mb-2 text-xl font-semibold text-black">Mobile Experience</h3>
					<p class="mb-4 text-gray-600">
						Responsive mobile-first design with interactive and reactive design.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">React</span>
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">TypeScript</span>
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800"
							>Tailwind CSS</span
						>
					</div>
				</div>
			</div>

			<!-- Project Card -->
			<div
				class="group overflow-hidden rounded-2xl bg-neutral-50 shadow-md transition-all duration-300 hover:shadow-xl"
			>
				<div class="relative aspect-square overflow-hidden">
					<img
						src="simply-ai.webp"
						alt="AI Integration"
						class="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div
						class="absolute inset-0 z-10 flex items-end justify-center gap-3 bg-linear-to-t from-black/70 to-transparent pb-6 opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
					>
						<a
							href="https://simply-ai-six.vercel.app/"
							target="_blank"
							class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/80"
						>
							<ExternalLink class="h-4 w-4" />
							Demo
						</a>
						<a
							href="https://github.com/ersyncd/SimplyAI"
							target="_blank"
							class="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-white/80"
						>
							<Github class="h-4 w-4" />
							Code
						</a>
					</div>
				</div>

				<div class="p-6">
					<h3 class="mb-2 text-xl font-semibold text-black">AI integration</h3>
					<p class="mb-4 text-gray-600">Complete e-commerce solution with payment integration.</p>
					<div class="flex flex-wrap gap-2">
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">React</span>
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800">Markdown</span>
						<span class="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800"
							>Tailwind CSS
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Contact Section  -->
<section id="contact" bind:this={contactSection} class="bg-white py-24 pb-12">
	<div class="container mx-auto px-6">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="mb-8 text-4xl font-bold text-black md:text-5xl">Let's Work Together</h2>
			<p class="mb-12 text-xl text-gray-600">
				I'm always open to discussing new projects, creative ideas, or opportunities to be part of
				your vision.
			</p>

			<a
				href="mailto:teguhersyarudin@gmail.com"
				class="text-text mb-12 inline-flex h-11 items-center justify-center gap-2 rounded-md px-8 text-sm font-medium transition"
			>
				<Mail class="h-5 w-5" />
				teguhersyarudin@gmail.com
			</a>

			<div class="flex justify-center gap-4">
				<a
					href="https://github.com/ersyncd"
					target="_blank"
					aria-label="GitHub"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
				>
					<Github class="h-5 w-5" />
				</a>

				<a
					href="https://www.linkedin.com/in/teguh-ersyarudin-aab190322"
					target="_blank"
					aria-label="LinkedIn"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
				>
					<Linkedin class="h-5 w-5" />
				</a>

				<a
					href="https://www.instagram.com/say_enough__"
					target="_blank"
					aria-label="Twitter"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-black transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white"
				>
					<Instagram class="h-5 w-5" />
				</a>
			</div>
		</div>
	</div>

	<div class="mt-24 text-center text-xs text-gray-500 md:text-base">
		<p>© 2025 Teguh Ersyarudin. All rights reserved.</p>
	</div>
</section>
