import { auth } from '@/lib/auth';
import Link from 'next/link';
import React from 'react';
import { NavItem } from 'react-bootstrap';
import LogoutButton from './LogoutButton.component';

async function AuthSection(): Promise<React.JSX.Element> {
	const session = await auth();
	const isAuth = !!session?.user;

	return (
		<>
			{isAuth && <AuthLinks />}
			<AuthButton isAuth={isAuth} />
		</>
	);
}

export default AuthSection;

function AuthButton({ isAuth }: { isAuth: boolean }): React.JSX.Element {
	return (
		<NavItem>
			{isAuth ? (
				<LogoutButton />
			) : (
				<Link
					className='nav-link'
					href='/auth/login'
				>
					Login
				</Link>
			)}
		</NavItem>
	);
}

function AuthLinks(): React.JSX.Element {
	return (
		<NavItem>
			<Link
				className='nav-link'
				href='/blog/posts/new'
			>
				Write new post
			</Link>
		</NavItem>
	);
}
