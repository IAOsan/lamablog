import React from 'react';
import { NavItem, NavLink } from 'react-bootstrap';
import LogoutButton from './LogoutButton.component';
import { auth } from '@/lib/auth';

async function AuthButton(): Promise<React.JSX.Element> {
	const session = await auth();
	
	return (
		<NavItem>
			{session?.user ? (
				<LogoutButton />
			) : (
				<NavLink href='/auth/login'>Login</NavLink>
			)}
		</NavItem>
	);
}

export default AuthButton;
