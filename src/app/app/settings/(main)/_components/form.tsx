'use client'

import React from 'react'
import { Session } from 'next-auth'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { SheetFooter } from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Spinner from '@/components/ui/spinner'

import { updateProfileSchema } from '../schema'
import { updateProfile, updateProfileTodoDTO } from '../actions'

type Props = {
  defaultValues: Session['user']
}
export function ProfileForm({ defaultValues }: Props) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const ref = React.useRef<HTMLDivElement>(null)
  const router = useRouter()

  const form = useForm<updateProfileTodoDTO>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: defaultValues.name ?? '',
      email: defaultValues.email ?? '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true)
    await updateProfile(data)
    router.refresh()

    ref.current?.click()

    toast({
      title: 'Success',
      description: 'Your profile has been updated successfully.',
    })
    setIsSubmitting(false)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 relative flex flex-col">
        <Card>
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>
              This will be the name displayed on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name here" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Please contact email contact@todoapp.com to change the email
              associated with your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      placeholder="Enter your email"
                      className="cursor-not-allowed opacity-50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <SheetFooter className="mt-auto">
          <Button type="submit" disabled={isSubmitting}>
            <span>Save Changes</span>
            {isSubmitting && <Spinner className="fill-primary" />}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
