import type { NextAuthOptions, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { refreshToken } from '@/zustand/action/authAction';

export const checkIfTokenExpired = (accessToken: string): boolean => {
  try {
    const decoded: any = jwtDecode(accessToken);

    const expMs = decoded.exp * 1000;
    const nowMs = Date.now();

    const fiveMinutes = 5 * 60 * 1000;

    return nowMs >= expMs || expMs - nowMs <= fiveMinutes;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error('Missing email or password');
        }

        const data: any = { email, password };

        try {
          let baseURL =
            process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/';

          const response = await axios.post(`${baseURL}api/login`, data, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });

          if (response?.status === 200 && response.data.success) {
            return response.data;
          }

          return null;
        } catch (error: any) {
          const errorCallBack = {
            message: error?.response?.data?.message,
            internal_code: error?.response?.data?.internal_code,
            code: error?.response?.data?.code,
            httpStatus: error?.status,
          };
          console.error('Error during login:', errorCallBack);
          throw new Error(
            error?.response ? JSON.stringify(errorCallBack) : error
          );
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    signOut: '/',
  },

  session: {
    strategy: 'jwt' as SessionStrategy,
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user.user;
        token.accessToken = user.tokens?.accessToken;
        token.refreshToken = user.tokens?.refreshToken;
      }

      if (token.accessToken) {
        const expired = checkIfTokenExpired(token.accessToken);
        if (expired) {
          const updated = await refreshToken(token.refreshToken);
          if (updated === 'logout') {
            token.signOutRequired = true;
          } else {
            token.accessToken = updated.accessToken;
            token.refreshToken = updated.refreshToken;
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user || null;
      session.accessToken = token.accessToken || null;
      session.refreshToken = token.refreshToken || null;
      session.signOutRequired = token.signOutRequired || false;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
