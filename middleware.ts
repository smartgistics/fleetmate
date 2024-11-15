import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Allow auth-related pages
      if (
        req.nextUrl.pathname.startsWith("/auth/") ||
        req.nextUrl.pathname === "/"
      ) {
        return true;
      }
      // Require token for other protected routes
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/((?!api/auth|_next|public|favicon.ico).*)"],
};
