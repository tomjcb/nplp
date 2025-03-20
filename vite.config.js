import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import ip from 'ip';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
	server: {
		hmr: {
			host: process.argv.includes('--host') ? ip.address() : null
		}
	}
});
