import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "ezequielgimenezdev@gmail.com",
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      return (
        user.email.toLowerCase().trim() ===
        process.env.ALLOWED_EMAIL?.toLowerCase().trim()
      );
    },
  },

  session: {
    strategy: "jwt", // ✅ ahora TS lo acepta
    maxAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/ingreso",
    verifyRequest: "/auth/verify-request-custom",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
