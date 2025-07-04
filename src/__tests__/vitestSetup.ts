import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from './testUtils';

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
});
