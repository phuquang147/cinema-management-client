import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import AuthServices from "~/services/authServices";

export const authOptions: NextAuthOptions = {
  secret: process.env.NextAuth_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Tên đăng nhập",
          type: "text",
          placeholder: "",
        },
        password: {
          label: "Mật khẩu",
          type: "password",
          placeholder: "",
        },
      },

      async authorize(credentials, req) {
        if (credentials) {
          const { data, status } = await AuthServices.login({
            username: credentials["username"],
            password: credentials["password"],
          });

          if (status === 200) {
            return data;
          } else return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
  pages: {
    signIn: "/dang-nhap",
  },
};

export default NextAuth(authOptions);
