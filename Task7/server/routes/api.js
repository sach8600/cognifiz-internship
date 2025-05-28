const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");
const router = express.Router();

// External API route
router.get("/weather", rateLimiter, authMiddleware, async (req, res) => {
  const city = req.query.city || "London";
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.EXTERNAL_API_KEY}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

module.exports = router;
