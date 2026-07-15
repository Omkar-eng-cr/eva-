const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'],
      trim: true
    },
    pickup: {
      type: String,
      required: [true, 'Pickup location is required'],
      trim: true
    },
    drop: {
      type: String,
      required: [true, 'Drop location is required'],
      trim: true
    },
    tripType: {
      type: String,
      enum: ['local', 'outstation', 'airport', 'hourly', 'corporate'],
      default: 'local'
    },
    date: {
      type: Date
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    }
  },
  {
    timestamps: true // adds createdAt / updatedAt automatically
  }
);

module.exports = mongoose.model('Booking', bookingSchema);