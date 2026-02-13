import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { convexHttp, api } from '@/lib/convexHttp';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events',
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
            email: user.email!,
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
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        const profile = await convexHttp.query(api.profiles.getByUserId, {
          user_id: user.id,
        });
        token.role = profile?.role ?? 'student';
      } else if (!token.role && token.sub) {
        const profile = await convexHttp.query(api.profiles.getByUserId, {
          user_id: token.sub,
        });
        if (profile?.role) {
          token.role = profile.role;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 
