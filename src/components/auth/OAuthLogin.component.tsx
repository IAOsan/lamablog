'use client';

import { signIn } from 'next-auth/react';
import { Button, Stack } from 'react-bootstrap';
import Icon from '../common/Icon.component';

function OAuthLogin(): React.JSX.Element {
	async function handleGoogleSignin(): Promise<void> {
		try {
			await signIn('google');
		} catch (error) {
			console.log('no se pudo iniciar sesion con google: ', error);
		}
	}

	async function handleGithubSignin(): Promise<void> {
		try {
			await signIn('github');
		} catch (error) {
			console.log('no se pudo iniciar sesion con github: ', error);
		}
	}

	return (
		<Stack gap={4}>
			<Button
				onClick={handleGoogleSignin}
				variant='outline-secondary'
				className='d-flex align-items-center justify-content-center w-100'
				type='button'
			>
				<span className='fs-4 me-4'>
					<Icon name='google' />
				</span>{' '}
				Continue with Google
			</Button>
			<Button
				onClick={handleGithubSignin}
				variant='outline-secondary'
				className='d-flex align-items-center justify-content-center w-100'
				type='button'
			>
				<span className='fs-4 me-4'>
					<Icon name='github' />
				</span>{' '}
				Continue with GitHub
			</Button>
		</Stack>
	);
}

export default OAuthLogin;
