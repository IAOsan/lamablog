import { authState, loginButton, logoutButton } from '@/__tests__/fixtures';
import { setup } from '@/__tests__/testUtils';
import AuthSection from '@/components/auth/AuthSection.component';
import { auth } from '@/lib/auth';
import { describe, expect } from 'vitest';

describe('<AuthSection>', () => {
	describe('Layout', () => {
		it('deberia de mostrar el boton de login si el usuario no esta autenticado', async () => {
			setup(await AuthSection());

			expect(loginButton()).toBeInTheDocument();
			expect(loginButton()).toHaveAttribute('href', '/auth/login');
		});

		it('no deberia de mostrar el boton de logout si el usuario no esta autenticado', async () => {
			setup(await AuthSection());

			expect(logoutButton()).not.toBeInTheDocument();
		});

		it('deberia de mostrar el boton de logout si el usuario esta autenticado', async () => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValueOnce(authState);
			setup(await AuthSection());

			expect(logoutButton()).toBeInTheDocument();
			expect(logoutButton()).toHaveAttribute('type', 'button');
		});

		it('no deberia de mostrar el boton de login si el usuario esta autenticado', async () => {
			(auth as ReturnType<typeof vi.fn>).mockResolvedValueOnce(authState);
			setup(await AuthSection());

			expect(loginButton()).not.toBeInTheDocument();
		});
	});
});
