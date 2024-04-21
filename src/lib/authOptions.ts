import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import YandexProvider from "next-auth/providers/yandex";
import GitHubProvider from "next-auth/providers/github";
import { XataAdapter } from "@next-auth/xata-adapter";
import { XataClient } from "@/xata";

const client = new XataClient();

export const authOptions = {
  adapter: XataAdapter(client),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID as string,
      clientSecret: process.env.YANDEX_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;
