/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		globals: true,
		// environment: 'jsdom',
		environment: 'happy-dom',
		reporters: 'verbose',
		setupFiles: [
			'./src/__tests__/vitestSetup.ts',
			'./src/__tests__/testSetup.ts',
		],
		mockReset: true,
	},
});
