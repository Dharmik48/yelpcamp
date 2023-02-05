import mongoose from 'mongoose'
import connectDB from '../../../../util/mongo'
import Review from '../../../../models/Review'

export default async function handler(req, res) {
  await connectDB()

  if (req.method === 'POST') {
    // get review data from req object
    const data = req.body
    // create a new review
    const review = await Review.create(data)
    // send success response
    return res.status(200).json(review)
  }
}
