import Stripe from 'stripe'
import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function webhookHandler(req, res) {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sign = req.headers['stripe-signature']
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event

    try {
      if (!sign || !webhookSecret) return

      event = stripe.webhooks.constructEvent(buf, sign, webhookSecret)
    } catch (e) {
      console.log(`Webhook error: ${error.message}`)
      return res.status(400).send(`Webhook error: ${error.message}`)
    }

    console.log('event', event)

    res.status(200).send()
  }
}
