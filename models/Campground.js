import mongoose from 'mongoose'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../util/firebase'

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
      type: [{ url: String, id: String }],
      required: true,
    },
  },
  { timestamps: true }
)

campgroundSchema.post('findOneAndDelete', async doc => {
  doc.images.forEach(async image => {
    await deleteObject(ref(storage, `images/${image.id}`))
  })
})

export default mongoose.models.Campground ||
  mongoose.model('Campground', campgroundSchema)
