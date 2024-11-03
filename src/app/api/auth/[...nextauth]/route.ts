import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AUTH_URL } from "@/utils/constants/urls";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          
          const response = await res.json();

          // Kiểm tra response success và có data
          if (res.ok && response.success && response.data) {
            const { user, token: accessToken, expiresIn } = response.data;
            
            // Return user object theo format mà NextAuth yêu cầu
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              accessToken: accessToken,
              refreshToken: response.data.refreshToken, 
              expiresIn: response.data.expiresIn
            };
          }

          // Nếu login thất bại
          throw new Error(response.message || "Login failed");
        } catch (error: any) {
          throw new Error(error.message || "Login failed");
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Update token với thông tin user khi login
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + (user.expiresIn * 1000);
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session.user) {
        // Update session với thông tin từ token
        session.user.id = token.id;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${AUTH_URL}/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken
      })
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.data.token,
      refreshToken: refreshedTokens.data.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + (refreshedTokens.data.expiresIn * 1000),
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
