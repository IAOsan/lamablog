'use client';

import { Button, NavItem } from 'react-bootstrap';
import { signOut } from 'next-auth/react';
import { testId } from '@/utils';

function LogoutButton(): React.JSX.Element {
	async function handleSignout(): Promise<void> {
		try {
			await signOut();
		} catch (error) {
			console.log('no se pudo cerrar sesion: ', error);
		}
	}

	return (
		<NavItem
			className='px-2'
			{...testId('logout-btn')}
		>
			<Button
				onClick={handleSignout}
				variant='outline-primary'
				type='button'
			>
				Logout
			</Button>
		</NavItem>
	);
}

export default LogoutButton;
