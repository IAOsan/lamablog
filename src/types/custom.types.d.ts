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

export type NewPostErrorType = Partial<
	Record<keyof z.infer<typeof newPostSchema>, string>
>;

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
	| 'heading-1'
	| 'heading-2'
	| 'heading-3'
	| 'heading-4'
	| 'heading-5'
	| 'heading-6'
	| 'instagram'
	| 'tiktok'
	| 'facebook'
	| 'youtube'
	| 'github'
	| 'google'
	| 'bold'
	| 'unordered-list'
	| 'ordered-list'
	| 'image-solid'
	| 'preview-solid'
	| 'strikethrough'
	| 'image-outline'
	| 'preview-outline'
	| 'checklist'
	| 'code'
	| 'italic'
	| 'quote'
	| 'link';
