import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	build: {
		target: 'esnext'
	},
	ssr: {
		external: ['firebase-admin']
	},
	define: {
		'process.env.NODE_ENV': '"production"',
		'process.env': '{}',
		'process.versions': '{}'
	}
});
