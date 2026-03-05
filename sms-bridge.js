import express from "express";
import axios from "axios";

const app = express();

const FAST2SMS_KEY = process.env.FAST2SMS_KEY;

app.get("/http-api.php", async (req, res) => {
  const { sender, to, message } = req.query;

  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        numbers: to,
        message: message,
        language: "english",
      },
      {
        headers: {
          authorization: FAST2SMS_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "SMS sending failed",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("SMS Bridge running");
});
