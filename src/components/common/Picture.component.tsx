import React from 'react';
import clsx from 'clsx';

const aspectRatios = {
		'1/1': '100%',
		'3/2': '66.66%',
		'4/3': '75%',
		'5/4': '80%',
		'16/10': '62.5%',
		'16/9': '56.25%',
	} as const;

function Picture({
	src,
	alt,
	width,
	height,
	aspectRatio,
	circle,
	wrapperClassName
}: {
	alt: string;
	src: string;
	aspectRatio?: keyof typeof aspectRatios;
	width?: string;
	height?: string;
	circle?: boolean;
	wrapperClassName?: string;
}): React.JSX.Element {
	const wrapperClassname = clsx('position-relative overflow-hidden', {
		['rounded-circle']: circle,
		['rounded']: !circle,
		[`${wrapperClassName}`]: wrapperClassName,
	});
	const style = {
        width: '100%',
        height: 'auto',
		...(width ? { width } : {}),
		...(height ? { paddingTop: height } : {}),
		...(aspectRatio ? { paddingTop: aspectRatios[aspectRatio] } : {}),
	};

	return (
		<div
			className={wrapperClassname}
			style={style}
		>
			<img
				src={src}
				alt={alt}
				className='d-block object-fit-cover position-absolute top-0 start-0 w-100 h-100'
				rel='noreferrer'
				loading='lazy'
				referrerPolicy='no-referrer'
			/>
		</div>
	);
}

export default Picture;
