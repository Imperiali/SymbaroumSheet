import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		target: 'esnext',
		rollupOptions: {
			external: ['node:crypto', 'node:http', 'node:https', 'node:stream', 'node:assert', 'node:url', 'node:util', 'node:net'],
		}
	}
});
