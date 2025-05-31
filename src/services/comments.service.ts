import { COMMENTS_ENDPOINT } from '@/constants';
import { IComment, IPost, SuccessResponseType } from '@/types/custom.types';
import httpService from './http.service';

type GetCommentsByPostIdSuccessResponse = SuccessResponseType<IComment>;

const service = {
	async getCommentsByPostId(postId: IPost['id']) {
		const url = `${COMMENTS_ENDPOINT}?orderBy="postId"&equalTo="${postId}"`;
		const { data, error } = await httpService.get(url);

		if (error || !data) {
			console.log('No se pudo obtener los comentarios');
			throw error;
		}

		const comments: GetCommentsByPostIdSuccessResponse = await data.json();

		return Object.keys(comments)
			.map((k) => ({
				id: k,
				...comments[k],
			}))
			.sort((a, b) => {
				const dateA = new Date(a.datetime);
				const dateB = new Date(b.datetime);

				return dateB.getTime() - dateA.getTime();
			});
	},
};

export default service;
