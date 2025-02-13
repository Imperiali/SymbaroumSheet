import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		serviceWorker: {
			register: true
		},
		env: {
			dir: process.cwd()
		},
		csrf: {
			checkOrigin: false
		}
	}
};

export default config;
