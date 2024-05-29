'use server'

import { z } from 'zod'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { updateProfileSchema } from './schema'

export type updateProfileTodoDTO = z.infer<typeof updateProfileSchema>

export async function updateProfile(params: updateProfileTodoDTO) {
  const session = await auth()
  if (!session?.user) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: params.name,
    },
  })

  return {
    error: null,
    data: 'Profile updated',
  }
}
