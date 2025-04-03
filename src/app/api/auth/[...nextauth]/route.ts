import { ISession } from "@/interfaces/ISession";
import { IUser } from "@/interfaces/IUser";
import { http } from "@/lib/apiClient";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: {
  accessToken: string;
  refreshToken: string;
  tokenExpiry: number;
  user: IUser;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  tokenExpiry: number;
  error?: string;
}> {
  try {
    const response = await http.post(
      `/users/auth/refresh-token`,
      { refreshToken: token.refreshToken }
    );

    const data = await response.data;

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenExpiry: data.tokenExpiry,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await http.post(
            `/users/auth`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const data = await response.data;

          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            tokenExpiry: data.tokenExpiry,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            nationalId: user.nationalId,
            birthdate: user.birthdate,
            contact: user.contact,
          },
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          tokenExpiry: user.tokenExpiry,
        };
      }

      if (trigger === "update") {
        return { ...token, ...session };
      }

      if (token.tokenExpiry && Date.now() < token.tokenExpiry) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...token.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        tokenExpiry: token.tokenExpiry,
      };
      session.error = token.error;
      return session;
    },
    redirect({ baseUrl }) {
      return `${baseUrl}`;
    },
  },
});

export { handler as GET, handler as POST };
