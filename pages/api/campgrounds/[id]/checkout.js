import Stripe from 'stripe'
import connectDB from '../../../../util/mongo'
import Campground from '../../../../models/Campground'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await connectDB()
    const campId = req.query.id
    const camp = await Campground.findById(campId)

    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'inr',
              product_data: {
                name: camp.name,
              },
              unit_amount: camp.price * 100,
            },
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}`,
        cancel_url: `${process.env.NEXTAUTH_URL}/campgrounds/${camp._id}`,
      })
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  }
}
