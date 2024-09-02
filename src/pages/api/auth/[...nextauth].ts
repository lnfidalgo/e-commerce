import NextAuth, { DefaultSession, NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { postDataToDB } from "@/src/services/baserow.service";

interface Credentials {
  email: string;
  password: string;
}

declare module "next-auth" {
  interface User {
    token: string;
  }

  interface Session {
    user: {
      id: string;
      token: string;
    } & DefaultSession["user"];
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Credentials | undefined
      ): Promise<User | null> {
        if (!credentials) {
          throw new Error("Credenciais não fornecidas.");
        }
        console.log('SOU AS CREDENTIALS:  ', credentials)
        try {
          const response = await axios.post(
            "https://api.baserow.io/api/user/token-auth/",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          const user = response.data;
          console.log("TO AQUI: ", user)
          if (user) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            // Exemplo: salvar o usuário e senha encriptada em um banco de dados.
            await postDataToDB(user);

            return {
              id: user.user.id.toString(),
              email: user.user.email,
              name: user.user.first_name,
              token: user.token,
            } as User;
          }
          return null;
        } catch (error) {
          console.error("Erro na autenticação com o Baserow:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      session.user.email = token.email;
      session.user.token = token.token as string;
      return session;
    },
  },
} as NextAuthOptions);
