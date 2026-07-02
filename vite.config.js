import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		include: ['clsx', 'devalue']
	},
	plugins: [tailwindcss(), sveltekit()]
});
