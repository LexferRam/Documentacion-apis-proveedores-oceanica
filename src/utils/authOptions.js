import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        p_portal_username: "calvarez",
        p_pwd: "Caraballeda05*",
      },
      authorize: async (credentials) => {

        console.log(credentials)
        try {
          // Llama a tu API externa para verificar las credenciales
          const { data } = await axios.post(
            "https://asesores.segurospiramide.com/asg-api/login", // Endpoint de tu API
            {
              p_portal_username: credentials.p_portal_username,
              p_pwd: credentials.p_pwd
            }
          );
          
          console.log(data)
          // const user = await response.json();

          return data;

          
        } catch (error) {
          console.error("Error en la autenticación:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Página personalizada de inicio de sesión
  },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Si el usuario está autenticado, agregamos sus datos al token JWT
  //     if (user) {
  //       token.id = user.id;
  //       token.name = user.name;
  //       token.email = user.email;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Agregamos los datos del token JWT a la sesión del usuario
  //     session.user.id = token.id;
  //     session.user.name = token.name;
  //     session.user.email = token.email;
  //     return session;
  //   },
  // },
  // secret: process.env.NEXTAUTH_SECRET, // Clave secreta para firmar tokens
};

export default NextAuth(authOptions);