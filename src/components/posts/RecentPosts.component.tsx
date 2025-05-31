import { PAGE_SIZE } from '@/constants';
import blogService from '@/services/blog.service';
import { IPost, searchParamType } from '@/types/custom.types';
import { Stack } from 'react-bootstrap';
import SubSectionHeader from '../layout/SubSectionHeader.component';
import Pagination from './Pagination.component';
import RecentPostCard from './RecentPostCard.component';

async function RecentPosts({
	rawPage,
	categoryId,
}: {
	rawPage: searchParamType;
	categoryId?: string;
}): Promise<React.JSX.Element> {
	const posts = await fetchPosts(categoryId);
	const currentPage = parsePage(rawPage);
	const startIndex = (currentPage - 1) * PAGE_SIZE;
	const endIndex = startIndex + PAGE_SIZE;

	return (
		<>
			<SubSectionHeader>
				<SubSectionHeader.Title>Recent Posts</SubSectionHeader.Title>
			</SubSectionHeader>
			<Stack gap={5}>
				{posts.slice(startIndex, endIndex).map((p) => (
					<RecentPostCard
						category={p.category}
						datetime={p.datetime}
						description={p.description}
						id={p.id}
						title={p.title}
						cover_image={p.cover_image}
						key={p.id}
					/>
				))}
			</Stack>
			<Pagination
				totalPages={Math.ceil(posts.length / PAGE_SIZE)}
				currentPage={currentPage}
			/>
		</>
	);
}

export default RecentPosts;

function fetchPosts(categoryId?: string): Promise<IPost[]> {
	if (categoryId) return blogService.getPostsByCategory(categoryId);
	return blogService.getAllPosts();
}

function parsePage(page: searchParamType): number {
	let value;

	if (Array.isArray(page)) {
		value = page[0];
	} else {
		value = page;
	}

	return value ? Number(value) : 1;
}
