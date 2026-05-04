import mongoose from 'mongoose'

const { Schema } = mongoose

// basic URL pattern (allows http/https and domain paths)
const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[^\s]*)?$/i

const PromotionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 150,
  },
  game: {
    type: String,
    required: [true, 'Game is required'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
    maxlength: 1000,
  },
  link: {
    type: String,
    required: [true, 'Link is required'],
    trim: true,
    match: [urlRegex, 'Please provide a valid URL'],
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration date is required'],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
})

PromotionSchema.virtual('isActive').get(function () {
  return this.expiresAt > new Date()
})

PromotionSchema.set('toJSON', {
  virtuals: true,
  transform(doc, ret) {
    delete ret.__v
    return ret
  },
})

export default mongoose.models.Promotion || mongoose.model('Promotion', PromotionSchema)
