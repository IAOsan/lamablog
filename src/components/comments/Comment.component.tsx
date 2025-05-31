import { IComment } from '@/types/custom.types';
import { capitalize, formatDate } from '@/utils';
import React from 'react';
import { Stack } from 'react-bootstrap';
import Picture from '../common/Picture.component';

function Comment({
	user,
	datetime,
	content,
}: Pick<IComment, 'user' | 'datetime' | 'content'>): React.JSX.Element {
	return (
		<div>
			<Stack
				className='mb-2'
				direction='horizontal'
				gap={3}
			>
				<Picture
					src={user.image}
					alt=''
					width='2.75rem'
					height='2.75rem'
					circle
				/>
				<div>
					<p className='mb-0'>
						<b>{capitalize(user.username)}</b>
					</p>
					<p className='mb-0 text-secondary'>{formatDate(datetime)}</p>
				</div>
			</Stack>
			<p className='mb-0 fw-medium'>{content}</p>
		</div>
	);
}

export default Comment;
