import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Allow auth-related pages and static assets
      if (
        req.nextUrl.pathname.startsWith("/auth/") ||
        req.nextUrl.pathname === "/" ||
        req.nextUrl.pathname.startsWith("/videos/") ||
        req.nextUrl.pathname.startsWith("/hero-images/") ||
        req.nextUrl.pathname === "/public/"
      ) {
        return true;
      }
      // Require token for other protected routes
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    // Match all paths except:
    "/((?!api/auth|_next|videos|hero-images|public|favicon.ico).*)",
  ],
};
