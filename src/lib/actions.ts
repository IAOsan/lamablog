'use server';
import httpService from '@/services/http.service';
import { IPost } from '@/types/custom.types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ZodError } from 'zod';
import { HttpError } from './customErrors.errors';
import { commentSchema, newPostSchema } from './schemas.validation';

export async function createNewComment(
	postId: IPost['id'],
	formData: FormData
) {
	const cookieStore = await cookies();
	const cookiesHeader = cookieStore.toString();
	const data = Object.fromEntries(formData.entries());

	try {
		const parsedData = await commentSchema.parseAsync(data);
		const url = `http://localhost:3000/api/blog/posts/123/comments`;
		const result = await httpService.post(url, {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookiesHeader,
			},
			body: JSON.stringify({ ...parsedData, postId }),
		});

		if (!result.error) revalidatePath(`/blog/posts/${postId}`);
	} catch (error) {
		if (error instanceof ZodError) {
			const [issue] = error.issues;

			return {
				error: {
					[`${issue.path[0]}`]: issue.message,
				},
			};
		}
	}
}

export async function createNewPost(formData: FormData) {
	const cookieStore = await cookies();
	const cookiesHeader = cookieStore.toString();
	const data = Object.fromEntries(formData.entries());

	try {
		await newPostSchema.parseAsync(data);
		const url = 'http://localhost:3000/api/blog/posts/new-post';
		const result = await httpService.post(url, {
			credentials: 'include',
			headers: {
				Cookie: cookiesHeader,
			},
			body: formData,
		});

		if (result.error || !result.data)
			throw new HttpError({
				message:
					'No se pudo guardar el post. Por favor, intenta de nuevo más tarde',
			});

		const { postId } = await result.data.json();

		revalidatePath('/blog/posts');

		return {
			data: { postId },
		};
	} catch (error) {
		if (error instanceof ZodError) {
			const errors = error.formErrors.fieldErrors;

			for (const key in newPostSchema.shape) {
				if (errors[key]) {
					const message = errors[key][0];

					return {
						error: { [key]: message },
					};
				}
			}
		}

		if (error instanceof HttpError) {
			return {
				error: { general: error.message },
			};
		}
	}
}
