import User from '../models/User'
import connectDb from './mongo'

export async function getUsers(fields) {
  await connectDb()
  // fetch users from db with only specific fields
  const users = await User.find({}, fields)
  // convert to readable object and return
  return JSON.parse(JSON.stringify(users))
}

export async function getUser(id, populateCampgrounds = false) {
  await connectDb()
  // find user with id
  const user = await User.findById(id)
  populateCampgrounds && (await user.populate('campgrounds'))
  // convert user to JS object and return
  return JSON.parse(JSON.stringify(user))
}
