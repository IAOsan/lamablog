export const SITE_NAME = 'Lamablog';
export const PAGE_SIZE = 4;
export const SALT_ROUNDS = 12;
export const USERS_ENDPOINT =
	'https://react-apps-882c7-default-rtdb.firebaseio.com/lamablog/users.json';
export const POSTS_ENDPOINT =
	'https://react-apps-882c7-default-rtdb.firebaseio.com/lamablog/posts.json';
export const CATEGORIES_ENDPOINT =
	'https://react-apps-882c7-default-rtdb.firebaseio.com/lamablog/categories.json';
export const COMMENTS_ENDPOINT =
	'https://react-apps-882c7-default-rtdb.firebaseio.com/lamablog/comments.json';
export const IMAGE_API_URL = 'https://api.imgbb.com/1/upload';
export const IMAGE_API_KEY = process.env.IMAGE_API_KEY || 'dummy-apikey';
