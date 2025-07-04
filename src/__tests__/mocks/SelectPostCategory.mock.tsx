import { capitalize } from '@/utils';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { blogCategories } from '../fixtures';

function SelectPostCategoryMock() {
	return (
		<ListGroup
			as='ul'
			variant='flush'
			data-testid='select-category'
		>
			{Object.entries(blogCategories).map(([k, v]) => (
				<ListGroupItem
					key={k}
					active={false}
					action
				>
					{capitalize(v.name)}
				</ListGroupItem>
			))}
		</ListGroup>
	);
}

vi.mock('@/components/posts/SelectPostCategory.component', () => ({
	default: SelectPostCategoryMock,
}));
