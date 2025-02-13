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
			buffer: 'buffer',
			'node:crypto': 'crypto-browserify',
			'node:stream': 'stream-browserify',
			'node:buffer': 'buffer',
			'node:util': 'util',
			'node:events': 'events',
			'node:process': 'process'
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis'
			}
		}
	}
});
