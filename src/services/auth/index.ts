import NextAuth from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import NodemailerProvider from 'next-auth/providers/nodemailer'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'

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
})
