import { screen } from './testUtils';

// /////////////////////////
// auth
// /////////////////////////
export const loggedUser = { name: 'Test User' };
export const authState = { user: loggedUser };
export const unauthState = null;
export const logoutButton = () =>
	screen.queryByRole('button', { name: /logout/i });
export const loginButton = () => screen.queryByRole('link', { name: 'Login' });
// /////////////////////////
// new post / options
// /////////////////////////
export const newPostTitleInput = () =>
	screen.queryByPlaceholderText('Add a title for your post');
export const newPostDescriptionInput = () =>
	screen.queryByPlaceholderText('Add a brief description');
export const newPostCoverImageInput = () =>
	screen.queryByTestId('image-picker-input') as HTMLInputElement;
export const newPostSaveButton = () =>
	screen.queryByTestId('newpost-save-button');
export const newPostCancelPostButton = () =>
	screen.queryByRole('button', { name: 'Cancel' });
// /////////////////////////
// new post / editor
// /////////////////////////
export const postEditorHeading1Button = () =>
	screen.queryByRole('button', { name: 'Insert heading 1' });
export const postEditorHeading2Button = () =>
	screen.queryByRole('button', { name: 'Insert heading 2' });
export const postEditorHeading3Button = () =>
	screen.queryByRole('button', { name: 'Insert heading 3' });
export const postEditorHeading4Button = () =>
	screen.queryByRole('button', { name: 'Insert heading 4' });
export const postEditorHeading5Button = () =>
	screen.queryByRole('button', { name: 'Insert heading 5' });
export const postEditorHeading6Button = () =>
	screen.queryByRole('button', { name: 'Insert heading 6' });
export const postEditorbBoldButton = () =>
	screen.queryByRole('button', { name: 'Add bold text' });
export const postEditorItalicButton = () =>
	screen.queryByRole('button', { name: 'Add italic text' });
export const postEditorStrikethroughButton = () =>
	screen.queryByRole('button', { name: 'Add strikethrough text' });
export const postEditorLinkButton = () =>
	screen.queryByRole('button', { name: 'Add a link' });
export const postEditorQuoteButton = () =>
	screen.queryByRole('button', { name: 'Add a quote' });
export const postEditorCodeButton = () =>
	screen.queryByRole('button', { name: 'Insert code' });
export const postEditorimageButton = () =>
	screen.queryByRole('button', { name: 'Add image' });
export const postEditorUnorderedlistButton = () =>
	screen.queryByRole('button', { name: 'Add unordered list' });
export const postEditorOrderedlistButton = () =>
	screen.queryByRole('button', { name: 'Add ordered list' });
export const postEditorCheckedlistButton = () =>
	screen.queryByRole('button', { name: 'Add checked list' });
export const postEditorPreviewButton = () =>
	screen.queryByRole('button', { name: 'Preview' });
export const postEditorContentArea = () =>
	screen.queryByPlaceholderText('Type your post');

// /////////////////////////
// dummy data
// /////////////////////////
export const dummyFile = new File(
	[new ArrayBuffer(0.1 * 1024 * 1024)],
	'dummy.jpg',
	{
		type: 'image/jpeg',
	}
);
export const dummyLargeFile = new File(
	[new ArrayBuffer(2 * 1024 * 1024)],
	'dummy.jpg',
	{
		type: 'image/jpeg',
	}
);
export const dummyUnsoportedFile = new File(['dummy'], 'dummy.gif', {
	type: 'image/gif',
});
export const blogCategories = {
	'-OLbO7MIUexqHw0Eac2h': {
		color: '61, 144,  215',
		description:
			'Explore insightful articles, tutorials, and tips on coding, programming languages, and software development trends.',
		image: 'https://picsum.photos/300',
		name: 'coding',
	},
	'-OLbOGwtKKs8QUsurbFK': {
		color: '253, 183, 234',
		description:
			'Discover unique takes on personal style, creative expression, and the latest in design and aesthetics.',
		image: 'https://picsum.photos/100',
		name: 'style',
	},
	'-OLbOHkMbIjRjW_uzZLY': {
		color: '110, 194, 7',
		description:
			'Stay updated with the latest fashion trends, outfit ideas, and industry news from around the world.',
		image: 'https://picsum.photos/200',
		name: 'fashion',
	},
	'-OLbOJSTKE4d7qSEL2tU': {
		color: '17, 117, 84',
		description:
			'Dive into delicious recipes, food culture, and culinary experiences that satisfy every craving.',
		image: 'https://picsum.photos/400',
		name: 'food',
	},
	'-OLbOKDz0vcisamE_CWN': {
		color: '255, 204, 0',
		description:
			'Find travel guides, tips, and inspiration to explore new destinations and plan your next adventure.',
		image: 'https://picsum.photos/500',
		name: 'travel',
	},
	'-OLbOMPndlU1sRYZ9gjz': {
		color: '96, 76, 195',
		description:
			'Explore cultural insights, traditions, and artistic expressions from communities across the globe.',
		image: 'https://picsum.photos/600',
		name: 'culture',
	},
};
