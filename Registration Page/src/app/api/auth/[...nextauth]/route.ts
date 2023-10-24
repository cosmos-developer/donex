import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import FacebookProvider from "next-auth/providers/facebook"

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.SECRET,
  providers: [
    FacebookProvider({
        clientId: process.env.FACEBOOK_ID || "",
        clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID || "",
        clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    TwitterProvider({
        clientId: process.env.TWITTER_CONSUMER_KEY || "",
        clientSecret: process.env.TWITTER_CONSUMER_SECRET || "",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.id;
        session.provider = token.provider;
      }
      return session;
    },
    async jwt({ token, account, profile }: any) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.provider = account.provider;
        token.id = profile.id;
      }
      return token;
    },
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }