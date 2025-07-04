import Comments from '@/components/comments/Comments.component';
import MarkdownRenderer from '@/components/common/MarkdownRenderer.component';
import Picture from '@/components/common/Picture.component';
import CategoriesList from '@/components/posts/CategoriesList.component';
import EditorsPickPosts from '@/components/posts/EditorsPickPosts.component';
import PopularPosts from '@/components/posts/PopularPosts.component';
import blogService from '@/services/blog.service';
import { IPost, IUser } from '@/types/custom.types';
import { capitalize, formatDate } from '@/utils';
import { notFound } from 'next/navigation';
import React from 'react';
import { Col, Container, Row, Stack } from 'react-bootstrap';

async function SinglePostPage({
	params,
}: {
	params: Promise<{ postId: string }>;
}): Promise<React.JSX.Element> {
	const { postId } = await params;
	const post = await blogService.getPostById(postId);

	if (!post) return notFound();

	return (
		<>
			<Container>
				<header className='mb-5'>
					<Row>
						<Col
							xs={12}
							lg={7}
							xl={6}
							className='d-flex flex-column justify-content-center order-2 order-lg-1'
						>
							<h1 className='display-4 fw-normal mb-5'>
								<b>{post.title}</b>
							</h1>
							<PostMetadata
								username={post.user.username}
								image={post.user.image}
								datetime={post.datetime}
							/>
						</Col>
						<Col
							xs={12}
							lg={5}
							xl={6}
							className='order-1 order-lg-2'
						>
							<Picture
								src={post.cover_image}
								alt=''
								aspectRatio='3/2'
							/>
						</Col>
					</Row>
				</header>
				<Row>
					<Col
						sm={8}
						md={7}
						lg={8}
					>
						<p>{post.description}</p>
						<MarkdownRenderer content={post.content} />
						<Comments postId={postId} />
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
		</>
	);
}

export default SinglePostPage;

function PostMetadata({
	image,
	username,
	datetime,
}: {
	image: IUser['image'];
	username: IUser['username'];
	datetime: IPost['datetime'];
}): React.JSX.Element {
	return (
		<Stack
			direction='horizontal'
			gap={3}
		>
			<Picture
				src={image}
				alt=''
				width='2.75rem'
				height='2.75rem'
				circle
			/>
			<div>
				<p className='mb-0'>
					<b>{capitalize(username)}</b>
				</p>
				<p className='mb-0'>{formatDate(datetime)}</p>
			</div>
		</Stack>
	);
}
