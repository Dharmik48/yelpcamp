import Stripe from 'stripe'
import connectDB from '../../../../util/mongo'
import Campground from '../../../../models/Campground'

export default async function handler(req, res) {
  const PAISA_TO_RUPEES = 100

  if (req.method === 'GET') {
    await connectDB()
    const { id: campId, adults, children, days, checkIn, checkOut } = req.query
    const camp = await Campground.findById(campId)
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

    const amount =
      (camp.price.adults * adults + camp.price.children * children) * days

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
              unit_amount: amount * PAISA_TO_RUPEES,
            },
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}/campgrounds/${camp._id}/success`,
        cancel_url: `${process.env.NEXTAUTH_URL}/campgrounds/${camp._id}`,
        metadata: {
          checkIn,
          checkOut,
        },
      })
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  }
}
