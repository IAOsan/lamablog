import CategoriesList from '@/components/posts/CategoriesList.component';
import EditorsPickPosts from '@/components/posts/EditorsPickPosts.component';
import FeaturedPostCard from '@/components/posts/FeaturedPostCard.component';
import PopularCategories from '@/components/posts/PopularCategories.component';
import PopularPosts from '@/components/posts/PopularPosts.component';
import RecentPosts from '@/components/posts/RecentPosts.component';
import { SITE_NAME } from '@/constants';
import { searchParamsType } from '@/types/custom.types';
import { Metadata } from 'next';
import { Col, Container, Row } from 'react-bootstrap';

export const metadata: Metadata = {
	title: SITE_NAME,
	description:
		'Lamablog is your digital space to discover fresh ideas, personal reflections, and inspiring content about culture, lifestyle, technology, and more. Explore, learn, and connect!',
};

export default async function HomePage({
	searchParams,
}: {
	searchParams: Promise<searchParamsType>;
}): Promise<React.JSX.Element> {
	const { page } = await searchParams;

	return (
		<Container>
			<section className='mb-5'>
				<h1 className='display-3 pt-3 pb-5 fw-semibold text-xs-center'>
					<b className='fw-bold'>Hey, lama dev here!</b> Discover my stories and
					creative ideas.
				</h1>
				<FeaturedPostCard />
			</section>
			<PopularCategories />
			<Row>
				<Col
					sm={8}
					md={7}
					lg={8}
					>
					<RecentPosts rawPage={page} />
				</Col>
				<Col
					sm={4}
					md={5}
					lg={4}
				>
					<PopularPosts />
					<CategoriesList />
					<EditorsPickPosts />
				</Col>
			</Row>
		</Container>
	);
}
