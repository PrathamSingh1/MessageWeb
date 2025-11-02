// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const Location = require("./models/Location");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI missing. Add it to .env");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, { dbName: process.env.DB_NAME || undefined })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

/**
 * POST /location
 * Body (JSON): {
 *   userId?: string,
 *   latitude: number,
 *   longitude: number,
 *   accuracy?: number,
 *   altitude?: number,
 *   heading?: number,
 *   speed?: number,
 *   provider?: string,
 *   meta?: object
 * }
 *
 * NOTE: This endpoint is intentionally left WITHOUT auth as requested.
 *       Anyone who can reach this endpoint can POST locations.
 */
app.post("/location", async (req, res) => {
  try {
    const { userId, latitude, longitude, accuracy, altitude, heading, speed, provider, meta } = req.body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(400).json({ error: "latitude and longitude required as numbers" });
    }

    const doc = new Location({
      userId,
      latitude,
      longitude,
      accuracy,
      altitude,
      heading,
      speed,
      provider: provider || "unknown",
      ip: req.ip || req.headers["x-forwarded-for"],
      userAgent: req.headers["user-agent"],
      meta
    });

    await doc.save();
    return res.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

/**
 * GET /location/:userId/latest
 * returns the most recent location for the given userId
 * (or use /location/id/:id to get by document id)
 */
app.get("/location/:userId/latest", async (req, res) => {
  try {
    const userId = req.params.userId;
    const doc = await Location.findOne({ userId }).sort({ createdAt: -1 }).lean();
    if (!doc) return res.status(404).json({ error: "no locations found for this userId" });
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

app.get("/locations/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = Math.min(parseInt(req.query.limit || "20", 10), 500);
    const docs = await Location.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean();
    return res.json(docs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

app.get("/location/id/:id", async (req, res) => {
  try {
    const doc = await Location.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: "not found" });
    return res.json(doc);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Location backend listening on port ${PORT}`);
});
