import Link from 'next/link';
import React from 'react';
import Picture from '../common/Picture.component';
import { IPostCategory } from '@/types/custom.types';
import { capitalize, isDarkColor } from '@/utils';
import clsx from 'clsx';

function PopularCategoryCard({id, image, name, color}: IPostCategory): React.JSX.Element {
	const [r, g, b] = color.split(',').map((c) => Number(c));
	const textColor = isDarkColor([r, g, b]) ? 'text-dark' : 'text-light';

	return (
		<Link
			href={`/blog/categories/${id}`}
			style={{
				backgroundColor: `rgba(${color}, 0.65)`,
			}}
			className={clsx(
				'd-inline-flex align-items-center py-3 px-5 rounded text-decoration-none',
				textColor
			)}
		>
			<Picture
				wrapperClassName='me-3'
				src={image}
				alt=''
				width='2.5rem'
				height='2.5rem'
				circle
			/>
			<p className='m-0'>
				<b>{capitalize(name)}</b>
			</p>
		</Link>
	);
}

export default PopularCategoryCard;
