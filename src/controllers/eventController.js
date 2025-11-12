import Event from "../models/Event.js";
import axios from "axios";

export const getNearbyEvents = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ message: "Latitude and longitude required" });
    }

    // Step 1: Find local events within 5km
    const localEvents = await Event.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 5000, // 5 km radius
        },
      },
    });

    // Step 2: Fetch external events from Ticketmaster API
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?latlong=${lat},${lng}&radius=5&apikey=${process.env.TICKETMASTER_API_KEY}`;
    const apiResponse = await axios.get(apiUrl);
    const externalEvents =
      apiResponse.data._embedded?.events?.map((e) => ({
        name: e.name,
        date: e.dates.start.localDate,
        category: e.classifications?.[0]?.segment?.name || "General",
        location: e._embedded?.venues?.[0]?.name || "Unknown",
      })) || [];

    // Step 3: Combine and return results
    res.json({ localEvents, externalEvents });
  } catch (error) {
    console.error("❌ Error fetching events:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
