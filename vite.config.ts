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
	resolve: {
		alias: {
			path: 'path-browserify',
			stream: 'stream-browserify',
			crypto: 'crypto-browserify',
			util: 'util',
			buffer: 'buffer'
		}
	},
	optimizeDeps: {
		include: ['buffer', 'path-browserify', 'stream-browserify', 'crypto-browserify', 'util']
	}
});
