import mongoose from 'mongoose'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../util/firebase'
import User from './User'

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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
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

campgroundSchema.post('findOneAndUpdate', async function (doc) {
  // get the new data
  const updatedData = await this.model.findById(this._conditions._id, 'images')
  // loop through old data images
  doc.images.forEach(async image => {
    // search the new data to see if the image is there or not
    const result = updatedData.images.find(img => img.id === image.id)
    // return if new data has the same image
    if (result) return
    // delete the image from storage if it not in the new data
    await deleteObject(ref(storage, `images/${image.id}`))
  })
})

export default mongoose.models.Campground ||
  mongoose.model('Campground', campgroundSchema)
