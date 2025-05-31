'use client';
import { createNewComment } from '@/lib/actions';
import { HttpError } from '@/lib/customErrors.errors';
import { commentSchema } from '@/lib/schemas.validation';
import { IPost } from '@/types/custom.types';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { z } from 'zod';

type FormErrorType = Partial<z.infer<typeof commentSchema>>;

function NewCommentForm({
	postId,
}: {
	postId: IPost['id'];
}): React.JSX.Element {
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [error, setError] = React.useState<FormErrorType | null>(null);

	async function formAction(formData: FormData): Promise<void> {
		setIsSubmitting(true);
		setError(null);

		try {
			const result = await createNewComment(postId, formData);

			if (result?.error)
				throw new HttpError<FormErrorType>({ reason: result.error });
		} catch (error) {
			if (error instanceof HttpError) setError(error.reason);
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<Form
			action={formAction}
			className='mb-5'
		>
			<Form.Group className='mb-4'>
				<Form.Control
					as='textarea'
					rows={3}
					placeholder='Write a comment...'
					name='content'
					isInvalid={!!error?.content}
				/>
				{!!error?.content && (
					<small className='mb-0 text-danger'>{error.content}</small>
				)}
			</Form.Group>
			<Button
				variant='primary'
				size='lg'
				className='d-block w-100'
				type='submit'
				disabled={isSubmitting}
			>
				{isSubmitting ? <b>Sending...</b> : <b>Send</b>}
			</Button>
		</Form>
	);
}

export default NewCommentForm;
