import { CATEGORIES_ENDPOINT } from '@/constants';
import { delay, http, HttpResponse } from 'msw';
import { blogCategories } from '../fixtures';

const getAllCategories = http.get(CATEGORIES_ENDPOINT, async () => {
	await delay('real');

	return HttpResponse.json(blogCategories);
});

const createNewPost = http.post(
	'http://localhost:3000/api/blog/posts/new-post',
	async ({ request }) => {
		const info = await request.formData();
		const data = Object.fromEntries(info.entries());

		await delay('real');

		if (String(data.title).includes('not valid')) {
			return HttpResponse.json(
				{
					ok: false,
					message:
						'No se pudo guardar el post en la base de datos, por favor intentalo mas tarde',
				},
				{ status: 400 }
			);
		}

		return HttpResponse.json(
			{
				ok: true,
				message: 'El post se ha creado correctamente',
				postId: Object.keys(blogCategories)[0],
			},
			{ status: 201 }
		);
	}
);

export const handlers = [getAllCategories, createNewPost];
