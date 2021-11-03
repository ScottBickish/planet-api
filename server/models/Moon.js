import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const MoonSchema = new Schema({
  name: { type: String, required: true },
  creatorId: { type: ObjectId, ref: 'Profile' },
  planetId: { type: ObjectId, required: true, ref: 'Planet' }
}, { timestamps: true, toJSON: { virtuals: true } })

MoonSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
