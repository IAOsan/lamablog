import blogService from '@/services/blog.service';
import { capitalize } from '@/utils';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

async function SelectPostCategory() {
	const categories = await blogService.getAllCategories();

	return (
		<ListGroup
			as='ul'
			variant='flush'
		>
			{categories.map((c, idx) => (
				<ListGroupItem
					key={c.id}
					active={idx === 0}
					action
				>
					{capitalize(c.name)}
				</ListGroupItem>
			))}
		</ListGroup>
	);
}

export default SelectPostCategory;
