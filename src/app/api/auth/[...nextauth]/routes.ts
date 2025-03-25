import { ISession } from "@/interfaces/ISession";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(oldSession: ISession) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + "users/auth/refresh-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: oldSession.refreshToken,
        }),
      }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...oldSession,
      token: refreshedTokens.accessToken,
      tokenExpiry: Date.now() + refreshedTokens.tokenExpiry * 1000,
      refreshToken: refreshedTokens.refreshToken ?? oldSession.refreshToken, // Fall back to old refresh token
      error: null,
    };
  } catch (error) {
    return {
      ...oldSession,
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
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("inside authorize: ");
        console.log(process.env.NEXT_PUBLIC_API);
        const response = await fetch(
          process.env.NEXT_PUBLIC_API + "/users/auth",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const session = await response.json();

        if (session) {
          return { id: session.user.id, ...session };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (token && user) {
        token.user = user;
        return token;
      } else if (Date.now() < token.user.tokenExpiry) {
        // Return previous token if the access token has not expired yet
        return token;
      } else {
        // Access token has expired, try to update it
        return refreshAccessToken(token.user);
      }
    },
    async session({ session, token }) {
      session.user = token.user.user;
      session.token = token.user.token;
      session.refreshToken = token.user.refreshToken;
      session.tokenExpiry = token.user.tokenExpiry;
      return session;
    },
    redirect({ url, baseUrl }) {
      return `${baseUrl}`;
    },
  },
});

export { handler as GET, handler as POST };
