import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_URL } from "@/utils/constants/urls";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "Id", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
        name: { label: "Name", type: "text" },
        role: { label: "Role", type: "text" },
        refreshToken: { label: "RefreshToken", type: "text" },
        expiresIn: { label: "ExpiresIn", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.token) {
            return {
              id: credentials.id || "google-user",
              name: credentials.name,
              email: credentials.email,
              role: credentials.role || "User",
              accessToken: credentials.token,
              refreshToken: credentials.refreshToken || "",
              expiresIn: credentials.expiresIn || 3600,
            };
          }

          const res = await fetch(`${AUTH_URL}/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const response = await res.json();

          if (res.ok && response.success && response.data) {
            const { user, token: accessToken, expiresIn } = response.data;

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken: accessToken,
              refreshToken: response.data.refreshToken,
              expiresIn: response.data.expiresIn,
            };
          }

          throw new Error(response.message || "Login failed");
        } catch (error: any) {
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + user.expiresIn * 1000;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${AUTH_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.data.token,
      refreshToken: refreshedTokens.data.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshedTokens.data.expiresIn * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
