'use client';
import { createNewPost } from '@/lib/actions';
import { HttpError } from '@/lib/customErrors.errors';
import { IPostCategory, NewPostErrorType } from '@/types/custom.types';
import Link from 'next/link';
import React from 'react';
import { Alert, Col, Container, Form, Row } from 'react-bootstrap';
import NewPostEditor from './NewPostEditor.component';
import NewPostOptions from './NewPostOptions.component';

function NewPostForm({ categories }: { categories: IPostCategory[] }) {
	const [postContent, setPostContent] = React.useState<string>('');
	const [error, setError] = React.useState<NewPostErrorType | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [newPostId, setNewPostId] = React.useState<null | string>(null);

	function clearError(inputName: string): void {
		if (!error || !error[inputName]) return;

		setError(null);
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const input = e.currentTarget;

		if (input.name === 'content') setPostContent(input.value);

		clearError(input.name);
	}

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		setIsLoading(true);
		setError(null);
		setNewPostId(null);

		try {
			const result = await createNewPost(formData);

			if (result?.error) {
				throw new HttpError<NewPostErrorType>({ reason: result.error });
			}

			setNewPostId(result?.data.postId);
		} catch (error) {
			if (error instanceof HttpError) setError(error.reason);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Container>
				<Row>
					<Col lg={9}>
						<NewPostEditor
							content={postContent}
							onChange={handleInputChange}
						/>
					</Col>
					<Col lg={3}>
						<NewPostOptions
							categories={categories}
							onChange={handleInputChange}
							isLoading={isLoading}
						/>
					</Col>
				</Row>
			</Container>
			{(newPostId || error) && (
				<Alert
					variant={newPostId ? 'success' : 'danger'}
					className='position-fixed bottom-0 start-0 w-100 m-0 rounded-0'
					dismissible={!!newPostId}
				>
					<Container>
						{newPostId ? (
							<p className='m-0'>
								<b>!Listo¡ </b>
								Tu post se ha creado correctamente{' '}
								<Link
									href={`/blog/posts/${newPostId}`}
									className='alert-link'
								>
									haz clic aquí para verlo
								</Link>
							</p>
						) : null}
						{error ? (
							<p className='m-0'>
								<b>!Oh snap! </b>
								{Object.values(error)[0]}
							</p>
						) : null}
					</Container>
				</Alert>
			)}
		</Form>
	);
}

export default NewPostForm;
