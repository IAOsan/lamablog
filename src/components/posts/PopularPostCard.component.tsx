import { Badge } from 'react-bootstrap';
import Post from '../common/Post.component';

function PopularPostCard(): React.JSX.Element {
	return (
		<Post>
			<Badge
				className='mb-3'
				bg='primary'
				pill
			>
				Travel
			</Badge>
			<Post.Title size='small'>
				A Journey Through Bohemian Beauty: Exploring the Streets of Prague
			</Post.Title>
			<small className='m-0'>
				<Post.Metadata bold>Joseph Owen</Post.Metadata> -{' '}
				<Post.Metadata>10.08.2023</Post.Metadata>
			</small>
		</Post>
	);
}

export default PopularPostCard;
