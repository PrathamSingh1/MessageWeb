// models/Location.js
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  userId: { type: String, required: false, index: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  accuracy: { type: Number, required: false },
  altitude: { type: Number, required: false },
  heading: { type: Number, required: false },
  speed: { type: Number, required: false },
  provider: { type: String, required: false },
  ip: { type: String, required: false },
  userAgent: { type: String, required: false },
  meta: { type: mongoose.Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: Date.now, index: true },
});

// Optional TTL index
// LocationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

const Location = mongoose.model("Location", LocationSchema);
export default Location;
