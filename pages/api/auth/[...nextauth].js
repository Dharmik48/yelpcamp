import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../models/User'
import connectDB from '../../../util/mongo'
import { compare } from 'bcryptjs'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        await connectDB()

        // Check if the user exists
        const user = await User.findOne({ email: credentials.email })
        // If does not exists or exists but the auth type is not email/pass then throw error
        if (!user || (user && user.auth_type !== 'credentials'))
          throw new Error('Invalid email or password!')
        // If user exists then check password
        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        )
        // If password is wrong then throw error
        if (!isPasswordCorrect) throw new Error('Invalid email or password!')
        // On correct password return the user
        return user
      },
    }),
  ],
})
