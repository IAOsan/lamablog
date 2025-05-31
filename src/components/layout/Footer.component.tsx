import Link from 'next/link';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import SocialList from '../common/SocialList.component';

const menu = [
	{
		path: '/',
		label: 'Home',
	},
	{
		path: '/',
		label: 'Blog',
	},
	{
		path: '/',
		label: 'About',
	},
	{
		path: '/',
		label: 'Contact',
	},
];
const tags = [
	{
		path: '/',
		label: 'Style',
	},
	{
		path: '/',
		label: 'Fashion',
	},
	{
		path: '/',
		label: 'Coding',
	},
	{
		path: '/',
		label: 'Travel',
	},
];
const social = [
	{
		path: '/',
		label: 'Facebook',
	},
	{
		path: '/',
		label: 'Instagram',
	},
	{
		path: '/',
		label: 'Tiktok',
	},
	{
		path: '/',
		label: 'Youtube',
	},
];

function Footer(): React.JSX.Element {
	return (
		<footer className='py-4'>
			<Container>
				<Row>
					<Col
						sm={8}
						className='d-flex flex-column justify-content-center'
					>
						<p className='text-muted'>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
							necessitatibus similique aspernatur obcaecati veritatis. Aperiam
							cum porro sequi, totam minima consequuntur, aspernatur deleniti
							vero repeltendus dorates.
						</p>
						<SocialList />
					</Col>
					<Col sm={4}>
						<Stack
							direction='horizontal'
							gap={3}
						>
							<Stack gap={3}>
								<h4 className='fs-6'>
									<b>Links</b>
								</h4>
								{menu.map((l) => (
									<Link
										key={l.label}
										href={l.path}
										className='link-underline-dark link-offset-3 link-underline-opacity-0 link-underline-opacity-75-hover text-dark'
									>
										{l.label}
									</Link>
								))}
							</Stack>
							<Stack gap={3}>
								<h4 className='fs-6'>
									<b>Tags</b>
								</h4>
								{tags.map((l) => (
									<Link
										key={l.label}
										href={l.path}
										className='link-underline-dark link-offset-3 link-underline-opacity-0 link-underline-opacity-75-hover text-dark'
									>
										{l.label}
									</Link>
								))}
							</Stack>
							<Stack gap={3}>
								<h4 className='fs-6'>
									<b>Social</b>
								</h4>
								{social.map((l) => (
									<Link
										key={l.label}
										href={l.path}
										className='link-underline-dark link-offset-3 link-underline-opacity-0 link-underline-opacity-75-hover text-dark'
									>
										{l.label}
									</Link>
								))}
							</Stack>
						</Stack>
					</Col>
				</Row>
			</Container>
		</footer>
	);
}

export default Footer;
