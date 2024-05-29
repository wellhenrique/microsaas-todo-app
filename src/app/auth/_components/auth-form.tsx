'use client'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import Spinner from '@/components/ui/spinner'

export function AuthForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      await signIn('nodemailer', { email: data.email, redirect: false })

      toast({
        title: 'Magic Link Sent',
        description: 'Check your email for the magic link to login',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-4 rounded-lg dark bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome Back
          </h1>
          <p className="dark:text-gray-500 text-gray-800">
            Sign in to your account using a magic link sent to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter your email"
              required
              type="email"
              {...form.register('email')}
            />
          </div>
          <Button
            className="w-full flex justify-center items-center gap-1.5"
            disabled={isSubmitting}
            type="submit"
          >
            <span>Sign In</span>
            {isSubmitting && <Spinner className="fill-primary" />}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <Link className="underline underline-offset-2" href="#">
            Resend magic link
          </Link>
        </div>
      </div>
    </main>
  )
}
