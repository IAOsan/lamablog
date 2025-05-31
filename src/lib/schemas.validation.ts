import { z } from 'zod';

export const commentSchema = z.object({
	content: z
		.string()
		.trim()
		.min(1, 'Por favor, escribe un comentario')
		.min(10, 'El comentario debe tener al menos 10 caracteres')
		.max(300, 'El comentario no debe exceder los 300 caracteres'),
});
