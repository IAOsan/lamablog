import Link from 'next/link';
import React from 'react';
import {
	Container,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarCollapse,
	NavbarToggle,
} from 'react-bootstrap';
import AuthSection from '../auth/AuthSection.component';
import SocialList from '../common/SocialList.component';

const NAVBAR_LINKS = [
	{
		label: 'Home',
		path: '/',
	},
	{
		label: 'Contact',
		path: '/contact',
	},
	{
		label: 'About',
		path: '/about',
	},
];

export function PrimaryNavbar(): React.JSX.Element {
	return (
		<Navbar
			expand='sm'
			className='bg-body-tertiary'
		>
			<Container>
				<NavbarToggle aria-controls='basic-navbar-nav' />
				<NavbarCollapse id='basic-navbar-nav'>
					<SocialList />
					<NavbarBrand
						className='align-self-center ms-auto'
						href='/'
					>
						<b>lamablog</b>
					</NavbarBrand>
					<Nav className='ms-auto'>
						{NAVBAR_LINKS.map((l) => (
							<Link
								className='nav-link'
								key={l.path}
								href={l.path}
							>
								{l.label}
							</Link>
						))}
						<AuthSection />
					</Nav>
				</NavbarCollapse>
			</Container>
		</Navbar>
	);
}
