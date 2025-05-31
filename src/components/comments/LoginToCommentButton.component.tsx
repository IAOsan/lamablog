import Link from 'next/link';
import React from 'react';

function LoginToCommentButton(): React.JSX.Element {
	return (
		<Link
			href='/auth/login'
			className='btn btn-outline-dark mb-5'
		>
			Login to write a comment
		</Link>
	);
}

export default LoginToCommentButton;
