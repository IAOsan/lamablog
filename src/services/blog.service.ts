import { CATEGORIES_ENDPOINT, POSTS_ENDPOINT } from '@/constants';
import {
	IPost,
	IPostCategory,
	SuccessResponseType,
} from '@/types/custom.types';
import httpService from './http.service';

type GetFeaturedPostSuccessResponse = SuccessResponseType<IPost>;

type GetAllSuccessResponse = SuccessResponseType<IPost>;

type GetPostsByCategorySuccessResponse = SuccessResponseType<IPost>;

type GetPopularPostsSuccessResponse = SuccessResponseType<IPost> | null;

type GetAllCategoriesSuccessResponse = SuccessResponseType<IPostCategory>;

type GetEditorsPickPostsSuccessResponse = SuccessResponseType<IPost>;

type GetPostByIdSuccessResponse = Omit<IPost, 'id'> | null;

type GetCategoryByIdSuccessResponse = Omit<IPostCategory, 'id'> | null;

const service = {
	async getFeaturedPost(): Promise<IPost> {
		const url = `${POSTS_ENDPOINT}?orderBy="featured"&equalTo=true`;
		const { data, error } = await httpService.get(url);

		if (error || !data) {
			console.log('No se pudo obtener el post destacado');
			throw error;
		}

		const post: GetFeaturedPostSuccessResponse = await data.json();

		return Object.keys(post).map((k) => ({
			id: k,
			...post[k],
		}))[0];
	},
	async getAllPosts(): Promise<IPost[]> {
		const { data, error } = await httpService.get(POSTS_ENDPOINT);

		if (error || !data) {
			console.log('No se pudieron obtener los posts');

			throw error;
		}

		const posts: GetAllSuccessResponse = await data.json();

		return Object.keys(posts)
			.map((k) => ({ id: k, ...posts[k] }))
			.sort((a, b) => {
				const dateA = new Date(a.datetime);
				const dateB = new Date(b.datetime);

				return dateB.getTime() - dateA.getTime();
			});
	},
	async getPostsByCategory(categoryId: IPostCategory['id']): Promise<IPost[]> {
		const url = `${POSTS_ENDPOINT}?orderBy="category/id"&equalTo="${categoryId}"`;
		const { data, error } = await httpService.get(url);

		if (error || !data) {
			console.log('No se pudieron obtener lost posts de la categoria');

			throw error;
		}

		const posts: GetPostsByCategorySuccessResponse = await data.json();

		return Object.keys(posts).map((k) => ({ id: k, ...posts[k] }));
	},
	async getPopularPosts(): Promise<IPost[]> {
		const url = `${POSTS_ENDPOINT}?orderBy="comments_count"&startAt=1&limitToLast=5`;
		const { data, error } = await httpService.get(url);

		if (error || !data) {
			console.log('No se puediron obtener los posts populares');

			throw error;
		}

		const posts: GetPopularPostsSuccessResponse = await data.json();

		return !posts
			? []
			: Object.keys(posts).map((k) => ({ id: k, ...posts[k] }));
	},
	async getAllCategories(): Promise<IPostCategory[]> {
		const { data, error } = await httpService.get(CATEGORIES_ENDPOINT);

		if (error || !data) {
			console.log('No se puediron obtener los categorias');

			throw error;
		}

		const categories: GetAllCategoriesSuccessResponse = await data.json();

		return Object.keys(categories).map((k) => ({ id: k, ...categories[k] }));
	},
	async getEditorsPickPosts(): Promise<IPost[]> {
		const url = `${POSTS_ENDPOINT}?orderBy="editors_pick"&equalTo=true`;
		const { data, error } = await httpService.get(url);

		if (error || !data) {
			console.log('No se puediron obtener los posts');

			throw error;
		}

		const posts: GetEditorsPickPostsSuccessResponse = await data.json();

		return Object.keys(posts).map((k) => ({ id: k, ...posts[k] }));
	},
	async getPostById(postId: IPost['id']): Promise<IPost | null> {
		const url = `${POSTS_ENDPOINT.split('.json')[0]}/${postId}.json`;
		const { data, error } = await httpService.get(url);

		if (error || !data) {
			console.log('No se pudo obtener el post por id');

			throw error;
		}

		const post: GetPostByIdSuccessResponse = await data.json();

		return !post ? null : { id: postId, ...post };
	},
	async getCategoryById(
		categoryId: IPostCategory['id']
	): Promise<IPostCategory | null> {
		const url = `${CATEGORIES_ENDPOINT.split('.json')[0]}/${categoryId}.json`;
		const { data, error } = await httpService.get(url);

		if (error || !data) {
			console.log('No se pudo obtener la categoria');

			throw error;
		}

		const category: GetCategoryByIdSuccessResponse = await data.json();

		return !category ? null : { id: categoryId, ...category };
	},
};

export default service;
