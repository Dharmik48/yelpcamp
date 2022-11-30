import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, 'Password must be atleast 8 characters'],
  },
  auth_type: {
    type: String,
    required: true,
    enum: ['credentials', 'google', 'facebook'],
  },
})

export default models.User || model('User', userSchema)
