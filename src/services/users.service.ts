import { USERS_ENDPOINT } from '@/constants';
import { IUser, SuccessResponseType } from '@/types/custom.types';
import httpService from './http.service';

type FindUserByEmailSuccessResponse = SuccessResponseType<IUser>;
type RegisterUserWithEmailSuccessResponse = {
	[name: string]: string;
};

const service = {
	async findUserByEmail(email: IUser['email']): Promise<null | IUser> {
		const url = `https://react-apps-882c7-default-rtdb.firebaseio.com/lamablog/users.json?orderBy="email"&equalTo="${email}"`;
		const { data, error } = await httpService.get(url);

		if (error || !data) {
			console.log('No se pudo encontrar el usuario');
			throw error;
		}

		const userFound: FindUserByEmailSuccessResponse = await data.json();
		const user = Object.keys(userFound).map((k) => ({
			id: k,
			...userFound[k],
		}));

		return !user.length ? null : user[0];
	},
	async registerUserWithEmail(user: Omit<IUser, 'id'>): Promise<IUser['id']> {
		const { data, error } = await httpService.post(USERS_ENDPOINT, {
			body: JSON.stringify(user),
		});

		if (error || !data) {
			console.log('No se pudo registrar al usuario');
			throw error;
		}

		const userId: RegisterUserWithEmailSuccessResponse = await data.json();

		return Object.keys(userId).map((k) => userId[k])[0];
	},
};

export default service;
