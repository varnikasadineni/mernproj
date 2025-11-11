import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  category: String,
  date: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number], // [longitude, latitude]
  },
});

eventSchema.index({ location: "2dsphere" }); // enable geospatial queries

const Event = mongoose.model("Event", eventSchema);
export default Event;
