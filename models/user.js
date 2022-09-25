const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const { handleSchemaValidationErrors, patterns } = require('../helpers')

const userSchema = new Schema(
  {
    username: {
      type: String,
      minLength: [3, 'Must be at least 3, got {VALUE}'],
      maxLength: [30, 'Must be maximum 30 symbols. You got {VALUE}'],
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: patterns.email,
      unique: true,
    },
    passwordHash: {
      type: String,
      minLength: [6, 'Must be at least 6, got {VALUE}'],
      maxLength: [40, 'Must be maximum 40 symbols. You got {VALUE}'],
      required: [true, 'Password is required'],
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    firstVisit: {
      type: Boolean,
      default: true,
    },
    progress: [
      {
        trainingDate: {
          type: Date,
          required: [true, 'Date is required'],
        },
        pagesAmount: {
          type: Number,
          min: 1,
          max: 1000,
          required: [true, 'Pages amount is required'],
        },
      },
    ],
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.post('save', handleSchemaValidationErrors)

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash)
}

const User = model('user', userSchema)

module.exports = {
  User,
}