import { Nav, NavItem } from 'react-bootstrap';
import Icon from './Icon.component';

function SocialList(): React.JSX.Element {
	return (
		<Nav className='list-inline'>
			<NavItem className='list-inline-item'>
				<Icon name='facebook' />
			</NavItem>
			<NavItem className='list-inline-item'>
				<Icon name='instagram' />
			</NavItem>
			<NavItem className='list-inline-item'>
				<Icon name='tiktok' />
			</NavItem>
			<NavItem className='list-inline-item'>
				<Icon name='youtube' />
			</NavItem>
		</Nav>
	);
}

export default SocialList;
