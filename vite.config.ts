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
			url: 'url',
			assert: 'assert',
			http: 'stream-http',
			https: 'https-browserify',
			net: 'net-browserify',
			'node:crypto': 'crypto-browserify',
			'node:stream': 'stream-browserify',
			'node:buffer': 'buffer',
			'node:util': 'util',
			'node:events': 'events',
			'node:process': 'process',
			'node:url': 'url',
			'node:assert': 'assert',
			'node:http': 'stream-http',
			'node:https': 'https-browserify',
			'node:net': 'net-browserify'
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
