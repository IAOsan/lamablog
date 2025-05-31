import NextAuth, { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import usersService from '@/services/users.service';

const config: NextAuthConfig = {
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	debug: process.env.NODE_ENV === 'development',
	pages: {
		signIn: '/auth/login',
	},
	callbacks: {
		async signIn({ user }) {
			try {
				const userFound = await usersService.findUserByEmail(
					String(user.email)
				);

				if (!userFound) {
					const userId = await usersService.registerUserWithEmail({
						image: String(user.image),
						username: String(user.name),
						email: String(user.email),
					});
					user.id = userId;
				}

				return true;
			} catch {
				return false;
			}
		},
		async jwt({ token,user }) {
			if (user) token.id = user.id;
			
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					username: token.name,
				},
			};
		},
	},
	providers: [Google, GitHub],
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
