import { IPost } from '@/types/custom.types';
import { formatDate, truncateText } from '@/utils';
import { Col, Row, Stack } from 'react-bootstrap';
import Post from '../common/Post.component';
import Picture from '../common/Picture.component';

function RecentPostCard({
	datetime,
	category,
	title,
	description,
	id,
	cover_image,
}: Pick<
	IPost,
	'datetime' | 'category' | 'title' | 'description' | 'id' | 'cover_image'
>): React.JSX.Element {
	return (
		<Post>
			<Row>
				<Col sm={12} lg={5} xl={6} className='d-flex flex-column justify-content-center'>
					<Picture
						src={cover_image}
						alt=''
						aspectRatio='3/2'
					/>
				</Col>
				<Col sm={12} lg={7} xl={6} className='d-flex flex-column justify-content-center'>
					<Stack
						className='mb-3'
						direction='horizontal'
						gap={2}
					>
						<Post.Metadata>{formatDate(datetime)}</Post.Metadata>
						{'-'}
						<Post.Metadata highlighted>
							{category.name.toUpperCase()}
						</Post.Metadata>
					</Stack>
					<Post.Title>{title}</Post.Title>
					<Post.Text>{truncateText(description, 120)}</Post.Text>
					<Post.ReadMore
						href={`/blog/posts/${id}`}
						secondary
					/>
				</Col>
			</Row>
		</Post>
	);
}

export default RecentPostCard;
