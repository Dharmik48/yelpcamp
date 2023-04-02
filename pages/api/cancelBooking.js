import User from '../../models/User'
const stripe = require('stripe')(
  'sk_test_51MdFk4SGiitP8hRj9ukgEycqW5nyGJ1MXeezVT8782VREdpqyClZfXkG7jJWPqsNl1ZxZ3Z0Lst8zqBwyEU65RSa00YtyBJgzV'
)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tripDetails, user: userId } = req.body

    const user = await User.findById(userId)

    let amount = tripDetails.charge

    if (user.premium.subscribed) amount *= 0.85

    const refund = await stripe.refunds.create({
      payment_intent: 'pi_3MsP1FSGiitP8hRj1pjeudY8',
      amount,
    })

    if (refund.status !== 'succeeded') return res.status(500).send(refund)

    await User.findByIdAndUpdate(userId, {
      $pull: { trips: { campground: tripDetails.campground } },
    })

    return res.status(200).send(refund)
  }
}
