// models/Location.js
const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  userId: { type: String, required: false, index: true }, // optional identifier (email/user id)
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  accuracy: { type: Number, required: false }, // meters if provided
  altitude: { type: Number, required: false },
  heading: { type: Number, required: false },
  speed: { type: Number, required: false },
  provider: { type: String, required: false }, // e.g., "browser", "gps"
  ip: { type: String, required: false },
  userAgent: { type: String, required: false },
  meta: { type: mongoose.Schema.Types.Mixed, required: false }, // any extra data
  createdAt: { type: Date, default: Date.now, index: true }
});

// Optional: create TTL index if you want documents to auto-expire (example: 30 days).
// Uncomment the following line if you want a TTL index and set expireAfterSeconds accordingly.
// LocationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

module.exports = mongoose.model("Location", LocationSchema);
