import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NodemailerProvider from 'next-auth/providers/nodemailer'

import { prisma } from '../database'
import { createStripeCustomer } from '../stripe'

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    error: '/auth',
    signIn: '/auth',
    newUser: '/app',
    signOut: '/auth',
    verifyRequest: '/auth',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    NodemailerProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.SECRET!,
  events: {
    createUser: async (message) => {
      if (!message?.user?.email) return

      await createStripeCustomer({
        email: message.user.email,
        name: message.user.name as string,
      })
    },
  },
})
