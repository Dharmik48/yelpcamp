import mongoose from 'mongoose'

const campgroundSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      max: 250,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Campground ||
  mongoose.model('Campground', campgroundSchema)
