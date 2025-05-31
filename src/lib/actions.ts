'use server';
import { IPost } from '@/types/custom.types';
import { cookies } from 'next/headers';
import { ZodError } from 'zod';
import { commentSchema } from './schemas.validation';
import httpService from '@/services/http.service';
import { revalidatePath } from 'next/cache';

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
