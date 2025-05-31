export type searchParamType = string | string[] | undefined;

export type searchParamsType = { [key: string]: searchParamType };

export interface IUser {
	id: string;
	image: string;
	username: string;
	email: string;
}

export interface IPostCategory {
	id: string;
	name: string;
	image: string;
	color: string;
	description: string;
}

export interface IPost {
	id: string;
	// category: {
	// 	id: IPostCategory['id'];
	// 	name: IPostCategory['name'];
	// };
	category: Pick<IPostCategory, 'id' | 'name'>;
	content: string;
	cover_image: string;
	datetime: string;
	description: string;
	editors_pick: boolean;
	featured: boolean;
	title: string;
	// user: {
	// 	id: IUser['id'];
	// 	image: IUser['image'];
	// 	username: IUser['username'];
	// };
	user: Pick<IUser, 'id' | 'image' | 'username'>;
}

export type SuccessResponseType<T> = {
	[key: string]: Omit<T, 'id'>;
};

export interface IComment {
	id: string;
	datetime: string;
	content: string;
	// user: {
	// 	id: IUser['id'];
	// 	image: IUser['image'];
	// 	username: IUser['username'];
	// };
	user: Pick<IUser, 'id' | 'image' | 'username'>;
	postId: IPost['id'];
}

export type IconNameType =
	| 'instagram'
	| 'tiktok'
	| 'facebook'
	| 'youtube'
	| 'github'
	| 'google';
