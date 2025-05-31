import { IPostCategory } from '@/types/custom.types';
import { capitalize, isDarkColor } from '@/utils';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

function CategoryBadge({
	color,
	name,
}: Pick<IPostCategory, 'color' | 'name'>): React.JSX.Element {
	const [r, g, b] = color.split(',').map((c) => Number(c));
	const textColor = isDarkColor([r, g, b]) ? 'text-dark' : 'text-light';

	return (
		<Link
			href={`/blog/categories/${name}`}
			style={{
				backgroundColor: `rgba(${color}, 0.65)`,
			}}
			className={clsx('rounded py-2 px-4 text-decoration-none', textColor)}
		>
			<b>{capitalize(name)}</b>
		</Link>
	);
}

export default CategoryBadge;
