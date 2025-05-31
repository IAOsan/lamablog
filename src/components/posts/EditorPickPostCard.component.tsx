import { IPost } from '@/types/custom.types';
import { capitalize, formatDate } from '@/utils';
import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import Picture from '../common/Picture.component';
import Post from '../common/Post.component';

function EditorPickPostCard({
	user,
	title,
	datetime,
}: Pick<IPost, 'user' | 'title' | 'datetime'>): React.JSX.Element {
	return (
		<Post>
			<Row>
				<Col
					xs={4}
					lg={3}
					className='d-flex flex-column justify-content-center align-items-center'
				>
					<Picture
						wrapperClassName='border border-3'
						src={user.image}
						alt=''
						aspectRatio='1/1'
						circle
					/>
				</Col>
				<Col
					xs={8}
					lg={9}
				>
					<Badge
						className='mb-2'
						bg='primary'
						pill
					>
						Travel
					</Badge>
					<Post.Title size='small'>{title}</Post.Title>
					<small className='m-0'>
						<Post.Metadata bold>{capitalize(user.username)}</Post.Metadata> -{' '}
						<Post.Metadata>{formatDate(datetime)}</Post.Metadata>
					</small>
				</Col>
			</Row>
		</Post>
	);
}

export default EditorPickPostCard;
