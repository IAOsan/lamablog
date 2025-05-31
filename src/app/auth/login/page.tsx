import OAuthLogin from '@/components/auth/OAuthLogin.component';
import { searchParamsType } from '@/types/custom.types';
import React from 'react';
import { Container } from 'react-bootstrap';

async function LoginPage({
	searchParams,
}: {
	searchParams: Promise<searchParamsType>;
}): Promise<React.JSX.Element> {
	const { redirect } = await searchParams;

	return (
		<Container>
			<div
				style={{ maxWidth: '32rem' }}
				className='rounded shadow p-5 text-center mx-auto'
			>
				<h1 className='mb-5 pb-5 border-bottom border-secondary'>
					<b>Sign Up / Sign In</b>
				</h1>
				<OAuthLogin />
			</div>
		</Container>
	);
}

export default LoginPage;

// redirect=blog/posts/postID
