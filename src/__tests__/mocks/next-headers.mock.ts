import { vi } from 'vitest';

vi.mock('next/headers', () => ({
	cookies: vi.fn(() => ({
		toString: () => 'mocked-cookie-header', // Puedes poner un valor vacío si no lo necesitas
		// Si tu código necesita otros métodos de cookieStore, mockéalos aquí
		get: vi.fn((name) => {
			if (name === 'myCookie') {
				return { name: 'myCookie', value: 'myValue' };
			}
			return undefined;
		}),
	})),
}));
