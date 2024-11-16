import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      userAvt: string;
      accessToken: string;
      refreshToken?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    userAvt: string;
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    userAvt: string;
    accessToken: string;
    refreshToken?: string;
    accessTokenExpires: number;
    error?: string;
  }
}
