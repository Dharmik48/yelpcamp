import { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: [8, 'Password must be atleast 8 characters'],
    },
    image: {
      type: String,
      required: true,
    },
    auth_type: {
      type: [String],
      enum: ['credentials', 'google', 'facebook'],
      required: true,
    },
  },
  { timestamps: true }
)

export default models.User || model('User', userSchema)
