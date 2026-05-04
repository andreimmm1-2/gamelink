import mongoose from 'mongoose'

const { Schema } = mongoose

const GameProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required'],
  },
  game: {
    type: String,
    required: [true, 'Game is required'],
    trim: true,
    enum: ['Roblox', 'Minecraft', 'Fortnite', 'AmongUs', 'Other'],
  },
  inGameName: {
    type: String,
    required: [true, 'In-game name is required'],
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    default: '',
    maxlength: 1000,
  },
  availability: {
    type: String,
    default: '',
    maxlength: 200,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
})

GameProfileSchema.index({ userId: 1, game: 1 })

export default mongoose.models.GameProfile || mongoose.model('GameProfile', GameProfileSchema)
