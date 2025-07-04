import { z } from 'zod';

const VALID_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_SIZE = 1; // 1MB

export const commentSchema = z.object({
	content: z
		.string()
		.trim()
		.min(1, 'Por favor, escribe un comentario')
		.min(10, 'El comentario debe tener al menos 10 caracteres')
		.max(300, 'El comentario no debe exceder los 300 caracteres'),
});

export const newPostSchema = z.object({
	content: z.string().trim().min(1, 'Please, add content to your post'),
	title: z
		.string()
		.trim()
		.min(1, 'Please, add a title to your post')
		.min(10, 'The title must be longer than 10 characters'),
	description: z
		.string()
		.trim()
		.min(1, 'Please, add a description to your post')
		.min(220, 'The description must be longer than 220 characters')
		.max(300, 'The description must be less than 300 characters'),
	cover_image: z
		.instanceof(File)
		.refine((file) => file && file.size > 0, {
			message: 'Please, add a cover image to your post',
		})
		.refine((file) => file.size < MAX_SIZE * 1024 * 1024, {
			message: 'The image must be less than 1MB',
		})
		.refine((file) => VALID_IMAGE_TYPES.includes(file.type), {
			message: 'Only JPEG, PNG and WEBP images are allowed',
		}),
	category: z.string().trim().min(1, 'Please add a category to your post'),
	featured: z
		.union([z.literal('on'), z.literal('true'), z.boolean()])
		.transform((value) => value === 'on' || value === 'true' || !!value)
		.default(false),
	editors_pick: z
		.union([z.literal('on'), z.literal('true'), z.boolean()])
		.transform((value) => value === 'on' || value === 'true' || !!value)
		.default(false),
});
