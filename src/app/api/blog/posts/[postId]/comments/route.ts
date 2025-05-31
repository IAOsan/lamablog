import { COMMENTS_ENDPOINT } from '@/constants';
import { auth } from '@/lib/auth';
import { HttpError } from '@/lib/customErrors.errors';
import httpService from '@/services/http.service';
import { IComment } from '@/types/custom.types';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const { postId, content } = await req.json();
	const session = await auth();

	if (!session?.user)
		throw new HttpError({ message: 'You are not logged in', status: 401 });
	if (!content) throw new HttpError({ message: 'Content is required' });
	if (!postId) throw new HttpError({ message: 'Post ID is required' });

	try {
		const comment: Omit<IComment, 'id'> = {
			content,
			postId,
			datetime: new Date().toISOString(),
			user: {
				id: session.user.id,
				username: session.user.username,
				image:
					session.user.image ||
					`https://ui-avatars.com/api/?background=0d6efd&color=fff&format=png&name=${session.user.name?.replaceAll(
						' ',
						'+'
					)}`,
			},
		};
		const { error } = await httpService.post(COMMENTS_ENDPOINT, {
			body: JSON.stringify(comment),
		});

		if (error) throw error;

		return Response.json(
			{ ok: true, message: 'Comment created successfully' },
			{ status: 201 }
		);
	} catch (error) {
		if (error instanceof HttpError) {
			return Response.json(
				{ ok: false, message: error.message },
				{ status: error.status }
			);
		}

		return Response.json(
			{ ok: false, message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
