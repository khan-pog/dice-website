import 'server-only'

import Stripe from 'stripe'

const key = process.env.STRIPE_SECRET_KEY

if (!key) {
  throw new Error('Missing environment variable: STRIPE_SECRET_KEY. Add it to your .env.local file.')
}

export const stripe = new Stripe(key)
