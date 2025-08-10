import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: true,
    unique: true,
    default: shortid.generate
  },
  originalUrl: {
    type: String,
    required: [true, "Original URL is required"],
    trim: true
  },
  shortUrl: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot be more than 500 characters"]
  }
}, {
  timestamps: true
});

// Generate short URL before saving
urlSchema.pre('save', function(next) {
  if (!this.shortUrl) {
    this.shortUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/${this.urlCode}`;
  }
  next();
});

// Method to increment clicks
urlSchema.methods.incrementClicks = function() {
  this.clicks += 1;
  return this.save();
};

const Url = mongoose.model('Url', urlSchema);

export default Url; 