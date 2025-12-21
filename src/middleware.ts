import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/ingreso",
  },
});

export const config = {
  matcher: ["/panel/:path*", "/contenido/:path*"],
};
