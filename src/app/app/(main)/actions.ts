'use server'

import { z } from 'zod'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { deleteTodoSchema, upsertTodoSchema } from './_components/schema'

export async function getUserTodos() {
  const session = await auth()
  if (!session?.user) {
    return []
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return todos
}

export type upsertTodoDTO = z.infer<typeof upsertTodoSchema>

export async function upsertTodo(params: upsertTodoDTO) {
  const session = await auth()
  if (!session?.user) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  const { id, ...data } = params
  if (id) {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    })

    if (!todo) {
      return {
        error: 'Todo not found',
        data: null,
      }
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todo.id,
      },
      data: {
        ...data,
      },
    })

    return {
      error: null,
      data: updatedTodo,
    }
  }

  if (!data.title) {
    return {
      error: 'Title is required',
      data: null,
    }
  }

  const todo = await prisma.todo.create({
    data: {
      title: data.title,
      userId: session.user.id,
    },
  })

  return {
    error: null,
    data: todo,
  }
}

type deleteTodoDTO = z.infer<typeof deleteTodoSchema>

export async function deleteTodo(params: deleteTodoDTO) {
  const session = await auth()
  if (!session?.user) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  if (!params.id) {
    return {
      error: 'Todo id required',
      data: null,
    }
  }

  await prisma.todo.delete({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  })

  return {
    error: null,
    data: 'Todo deleted successfully!',
  }
}
