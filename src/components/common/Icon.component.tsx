import { IconNameType } from '@/types/custom.types';
import classNames from 'classnames';
import React from 'react';

interface IProps {
	name: IconNameType;
	inline?: boolean;
}

function Icon({ name, inline }: IProps): React.JSX.Element {
	return (
		<svg className={classNames('icon', { inline: inline })}>
			<use xlinkHref={`/sprite.svg#icon-${name}`} />
		</svg>
	);
}

export default Icon;
