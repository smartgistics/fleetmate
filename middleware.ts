import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname;

      // Allow public paths
      const publicPaths = [
        "/auth",
        "/",
        "/videos",
        "/hero-images",
        "/public",
        "/api/auth",
      ];

      if (publicPaths.some((p) => path.startsWith(p))) {
        return true;
      }

      // Require token for protected routes
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    // Match all paths except next internal and public assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
