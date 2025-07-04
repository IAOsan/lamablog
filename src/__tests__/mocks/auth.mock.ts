import { vi } from 'vitest';
import { unauthState } from '../fixtures';

vi.mock('@/lib/auth', () => ({
	auth: vi.fn(() => unauthState),
}));
