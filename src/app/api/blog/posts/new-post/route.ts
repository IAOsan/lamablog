import { IMAGE_API_KEY, IMAGE_API_URL, POSTS_ENDPOINT } from '@/constants';
import { auth } from '@/lib/auth';
import { HttpError } from '@/lib/customErrors.errors';
import { newPostSchema } from '@/lib/schemas.validation';
import httpService from '@/services/http.service';
import { IPost } from '@/types/custom.types';
import console from 'console';
import { NextRequest } from 'next/server';
import { ZodError } from 'zod';

type ImageVariant = {
	filename: string;
	name: string;
	mime: string;
	extension: string;
	url: string;
};

type PostImageSuccessResponse = {
	data: {
		id: string;
		title: string;
		url_viewer: string;
		url: string;
		display_url: string;
		width: string;
		height: string;
		size: string;
		time: string;
		expiration: string;
		image: ImageVariant;
		thumb: ImageVariant;
		medium: ImageVariant;
		delete_url: string;
	};
	success: boolean;
	status: number;
};

type SavePostSuccessResponse = {
	name: string;
};

export async function POST(req: NextRequest) {
	const session = await auth();
	const formData = await req.formData();
	const data = Object.fromEntries(formData);

	if (!session?.user)
		throw new HttpError({
			message: 'No has iniciado sesion, por favor inicia sesion para continuar',
			status: 401,
		});

	try {
		// /////////////////////////////////////////////
		// validation
		// /////////////////////////////////////////////
		const {
			title,
			description,
			category,
			content,
			cover_image,
			editors_pick,
			featured,
		} = await newPostSchema.parseAsync(data);
		const [categoryID, categoryName] = category.split('%');
		// /////////////////////////////////////////////
		// upload image
		// /////////////////////////////////////////////
		const imageData = new FormData();
		imageData.append('key', IMAGE_API_KEY);
		imageData.append('image', cover_image);

		const { data: uploadedImageResponse, error: uploadedImageError } =
			await httpService.post(IMAGE_API_URL, {
				body: imageData,
				headers: {},
			});

		if (uploadedImageError || !uploadedImageResponse) {
			throw new HttpError({
				message:
					'Error al subir la imagen de portada, por favor usa otra imagen o inténtalo mas tarde',
			});
		}

		const {
			data: {
				medium: { url: imageURL },
			},
		}: PostImageSuccessResponse = await uploadedImageResponse.json();
		// /////////////////////////////////////////////
		// upload post
		// /////////////////////////////////////////////
		const newPost: Omit<IPost, 'id'> = {
			title,
			content,
			description,
			cover_image: imageURL,
			category: {
				id: categoryID,
				name: categoryName,
			},
			featured,
			editors_pick,
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

		const { data: uploadedPostData, error: uploadedPostError } =
			await httpService.post(POSTS_ENDPOINT, {
				body: JSON.stringify(newPost),
			});

		if (!uploadedPostData || uploadedPostError) {
			throw new HttpError({
				message:
					'No se pudo guardar el post en la base de datos, por favor intentalo mas tarde',
			});
		}

		const { name }: SavePostSuccessResponse = await uploadedPostData.json();

		return Response.json(
			{
				ok: true,
				message: 'El post se ha creado correctamente',
				postId: name,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('Failed to save post to database:', error);

		if (error instanceof ZodError) {
			return Response.json(
				{
					ok: false,
					reason: error.flatten().fieldErrors,
				},
				{ status: 400 }
			);
		}

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
