import mongoose, { Schema, models, model } from 'mongoose'
import User from './User'

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      max: [150, 'Review can not be more than 150 letters'],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: User,
    },
  },
  { timestamps: true }
)

export default models.Review || mongoose.model('Review', reviewSchema)
