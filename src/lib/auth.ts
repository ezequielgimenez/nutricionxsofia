import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: "smtp.resend.com",
        port: 587,
        auth: {
          user: "resend",
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: `"Enlace de autenticación - nutriciónxsofía" <${process.env.EMAIL_FROM}>`,
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
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/ingreso",
    verifyRequest: "/auth/verify-request-custom",
  },
};
