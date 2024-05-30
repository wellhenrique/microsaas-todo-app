'use server'
import { redirect } from 'next/navigation'

import { auth } from '@/services/auth'
import { createCheckoutSession } from '@/services/stripe'

export const createCheckoutSessionAction = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    return {
      error: 'Not authorized',
      data: null,
    }
  }

  const checkoutSession = await createCheckoutSession({
    userEmail: session.user.email,
    userStripeSubscriptionId: session.user.stripeSubscriptionId as string,
  })

  if (!checkoutSession.url) return
  redirect(checkoutSession.url)
}
