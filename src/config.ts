export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    webhookSecret: '',
    plans: {
      free: {
        priceId: 'price_1PMCF4JpvJw9wVzq3DpX9in2',
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: 'price_1PMCFHJpvJw9wVzqn2dmGenY',
        quota: {
          TASKS: 100,
        },
      },
    },
  },
}
