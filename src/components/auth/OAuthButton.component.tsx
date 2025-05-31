import { IconNameType } from '@/types/custom.types';
import { capitalize } from '@/utils';
import { OAuthProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import React from 'react';
import { Button } from 'react-bootstrap';
import Icon from '../common/Icon.component';

function OAuthButton({
	provider,
}: {
	provider: OAuthProviderType;
}): React.JSX.Element {
	async function handleLogin(): Promise<void> {
		try {
			await signIn(`${provider}`);
		} catch (error) {
			console.log(`no se pudo iniciar sesion con ${provider}: `, error);
		}
	}

	return (
		<Button
			onClick={handleLogin}
			variant='outline-secondary'
			className='d-flex align-items-center justify-content-center w-100'
			type='button'
		>
			<span className='fs-4 me-4'>
				<Icon name={provider as IconNameType} />
			</span>{' '}
			Continue with {capitalize(provider)}
		</Button>
	);
}

export default OAuthButton;
