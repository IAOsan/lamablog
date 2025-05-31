import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

function Post({ children }: React.PropsWithChildren) {
	return <article>{children}</article>;
}

Post.Title = PostTitle;
Post.Text = PostText;
Post.Metadata = PostMeta;
Post.ReadMore = PostReadMore;

export default Post;

function PostTitle({
	size,
	children,
}: {
	size?: 'large' | 'small';
	children: React.ReactNode;
}): React.JSX.Element {
	const className = classNames(
		{ 'fs-6 fw-normal mb-2': size === 'small' },
		{ 'fs-1 fw-bold mb-3': size === 'large' },
		{ 'fs-4 fw-bold mb-3': !size }
	);

	return <h3 className={className}>{children}</h3>;
}

function PostText({ children }: React.PropsWithChildren): React.JSX.Element {
	return <p className='text-muted'>{children}</p>;
}

function PostMeta({
	highlighted,
	bold,
	children,
}: {
	highlighted?: boolean;
	bold?: boolean;
	children: React.ReactNode;
}): React.JSX.Element {
	const className = classNames(
		{ 'text-danger fw-medium': highlighted },
		{ 'text-muted': !highlighted },
		{ 'fw-bold': bold }
	);

	return <span className={className}>{children}</span>;
}

function PostReadMore({
	secondary,
	href,
	children,
}: {
	secondary?: boolean;
	href: string;
	children?: React.ReactNode;
}): React.JSX.Element {
	const className = classNames(
		'align-self-start',
		{
			'link-dark link-offset-3 link-underline-opacity-50 link-underline-opacity-75-hover':
				secondary,
		},
		{ 'btn btn-light': !secondary }
	);

	return (
		<Link
			href={href}
			className={className}
		>
			{children || 'Read More'}
		</Link>
	);
}
