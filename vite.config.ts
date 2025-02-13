import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	build: {
		target: 'esnext'
	},
	ssr: {
		noExternal: ['firebase', '@firebase/*']
	},
	optimizeDeps: {
		exclude: ['firebase', '@firebase/*']
	},
	define: {
		'process.env.NODE_ENV': '"production"',
		'process.env': '{}',
		'process.versions': '{}'
	}
});
