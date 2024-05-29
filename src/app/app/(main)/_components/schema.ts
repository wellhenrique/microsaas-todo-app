import { z } from 'zod'

export const upsertTodoSchema = z.object({
  id: z.string().optional(),
  doneAt: z.date().optional().nullable(),
  title: z.string().min(1).optional(),
})

export const deleteTodoSchema = z.object({
  id: z.string().optional(),
})
