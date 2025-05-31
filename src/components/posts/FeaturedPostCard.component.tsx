import blogService from '@/services/blog.service';
import { Col, Row } from 'react-bootstrap';
import Post from '../common/Post.component';
import Picture from '../common/Picture.component';

async function FeaturedPostCard(): Promise<React.JSX.Element> {
	const { cover_image, title, description, id } = await blogService.getFeaturedPost();

	return (
		<Post>
			<Row>
				<Col sm={12} md={6} className='d-flex flex-column justify-content-center'>
					<Picture
						src={cover_image}
						alt=''
						aspectRatio='4/3'
					/>
				</Col>
				<Col sm={12} md={6} className='d-flex flex-column justify-content-center'>
					<Post.Title size='large'>{title}</Post.Title>
					<Post.Text>{description}</Post.Text>
					<Post.ReadMore href={`/posts/${id}`} />
				</Col>
			</Row>
		</Post>
	);
}

export default FeaturedPostCard;
