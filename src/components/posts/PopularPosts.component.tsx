import blogService from '@/services/blog.service';
import { Stack } from 'react-bootstrap';
import SubSectionHeader from '../layout/SubSectionHeader.component';
import PopularPostCard from './PopularPostCard.component';

async function PopularPosts(): Promise<React.JSX.Element> {
	const posts = await blogService.getPopularPosts();

	return (
		<section className='mb-5'>
			<SubSectionHeader>
				<SubSectionHeader.Subtitle>What’s hot</SubSectionHeader.Subtitle>
				<SubSectionHeader.Title>Most Popular</SubSectionHeader.Title>
			</SubSectionHeader>
			{!posts.length ? (
				<EmptyState />
			) : (
				<Stack gap={4}>
					<PopularPostCard />
					<PopularPostCard />
					<PopularPostCard />
					<PopularPostCard />
				</Stack>
			)}
		</section>
	);
}

export default PopularPosts;

function EmptyState(): React.JSX.Element {
	return (
		<div>
			<h4 className='fs-5'>📝 There are no popular posts yet</h4>
			<small>Be the first to comment and make a story trend!</small>
		</div>
	);
}
