import CategoriesList from '@/components/posts/CategoriesList.component';
import EditorsPickPosts from '@/components/posts/EditorsPickPosts.component';
import PopularPosts from '@/components/posts/PopularPosts.component';
import RecentPosts from '@/components/posts/RecentPosts.component';
import { SITE_NAME } from '@/constants';
import blogService from '@/services/blog.service';
import { searchParamsType } from '@/types/custom.types';
import { capitalize } from '@/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

interface IProps {
	params: Promise<{ categoryId: string }>;
	searchParams: Promise<searchParamsType>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
	const { categoryId } = await params;
	const category = await blogService.getCategoryById(categoryId);

	if (!category) {
		return {
			title: `${SITE_NAME} | Category not found`,
		};
	}

	return {
		title: `${SITE_NAME} | ${capitalize(category.name)} blog`,
		description: category.description,
	};
}

async function CategoryPostsPage({
	params,
	searchParams,
}: IProps): Promise<React.JSX.Element> {
	const { categoryId } = await params;
	const category = await blogService.getCategoryById(categoryId);
	const { page } = await searchParams;

	if (!category) return notFound();

	return (
		<Container>
			<h1 className='display-4 fw-semibold mb-5'>
				<b className='fw-bold'>{capitalize(category.name)}</b> blog
			</h1>
			<Row>
				<Col
					sm={8}
					md={7}
					lg={8}
				>
					<RecentPosts
						rawPage={page}
						categoryId={categoryId}
					/>
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

export default CategoryPostsPage;
