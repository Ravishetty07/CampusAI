const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const MODEL_NAME = "models/gemini-1.5-flash-latest"; // Gemini model name

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message is required." });
  }

  try {
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: message }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
    res.json({ reply });

  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ reply: "AI failed to respond. Try again later. " + error.message });
  }
});

module.exports = router;
