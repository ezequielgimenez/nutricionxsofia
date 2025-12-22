import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: "smtp.mailersend.net",
        port: 587, // también puede ser 2525
        auth: {
          user: process.env.MAILERSEND_USER, // pones MS_BY8Myv@test-zxk54v8n726ljy6v.mlsender.net
          pass: process.env.MAILERSEND_PASS, // pones mssp.s1FZ6Pg.z86org8xem04ew13.MQOlC2i
        },
      },
      from: process.env.EMAIL_FROM, // debe ser un correo verificado en MailerSend
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
