import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "azure-ad") {
        return profile?.email?.endsWith("@corporatetraffic.com") ?? false;
      }
      return false;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

// Export the handler with proper typing for Next.js App Router
export { handler as GET, handler as POST };
