import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import { convexHttp, api } from '@/lib/convexHttp';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refreshToken) {
      return { ...token, error: 'RefreshAccessTokenError' };
    }

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      grant_type: 'refresh_token',
      refresh_token: String(token.refreshToken),
    });

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch (error) {
    console.error('Failed to refresh access token', error);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/classroom.courses.readonly ' +
            'https://www.googleapis.com/auth/classroom.coursework.me ' +
            'https://www.googleapis.com/auth/calendar.readonly ' +
            'https://www.googleapis.com/auth/calendar.events',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          await convexHttp.mutation(api.profiles.createIfMissing, {
            user_id: user.id,
            email: user.email ?? '',
            full_name: user.name ?? undefined,
            role: 'student',
          });

          return true;
        } catch (error) {
          console.error('Error during sign in:', error);
          return false;
        }
      }
      return false;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? session.user.id;
        session.user.role = token.role as string | undefined;
      }

      session.accessToken = token.accessToken as string | undefined;
      session.error = token.error as string | undefined;

      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token ?? token.refreshToken;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 60 * 60 * 1000;

        const profile = await convexHttp.query(api.profiles.getByUserId, {
          user_id: user.id,
        });
        token.role = profile?.role ?? 'student';

        return token;
      }

      if (!token.role && token.sub) {
        const profile = await convexHttp.query(api.profiles.getByUserId, {
          user_id: token.sub,
        });
        if (profile?.role) {
          token.role = profile.role;
        }
      }

      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
