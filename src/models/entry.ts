import mongoose, { Model, Schema } from 'mongoose'
import { Entry } from '@/interfaces'

export interface EntryInterface extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ['to-do', 'in-progress', 'done'],
      message: 'Invalid status',
    },
    default: 'to-do',
  },
})

const EntryModel: Model<EntryInterface> =
  mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel
