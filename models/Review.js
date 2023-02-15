import { Schema, models, model } from 'mongoose'

const reviewSchema = new Schema(
  {
    text: {
      type: String,
      max: [150, 'Review can not be more than 150 letters'],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    campground: {
      type: Schema.Types.ObjectId,
      ref: 'Campground',
      required: true,
    },
  },
  { timestamps: true }
)

export default models.Review || model('Review', reviewSchema)
