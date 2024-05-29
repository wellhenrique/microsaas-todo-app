'use client'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'

import { upsertTodo } from '../actions'
import { upsertTodoSchema } from './schema'

import { Todo } from '../types'
import { toast } from '@/components/ui/use-toast'

type TodoUpsertSheetProps = {
  defaultValue?: Todo
  children?: React.ReactNode
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(upsertTodoSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    await upsertTodo(data)
    router.refresh()

    ref.current?.click()

    toast({
      title: 'Success',
      description: `Todo ${data.id ? 'updated' : 'created'} successfully!`,
    })
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="space-y-8 h-screen relative flex flex-col"
          >
            <SheetHeader>
              <SheetTitle>Upsert Todo</SheetTitle>
              <SheetDescription>
                Add or update your todo item here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your todo title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the publicly displayed title for your todo
                    item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="mt-auto fixed bottom-4 right-[24px]">
              <Button type="submit">Create Todo</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
