import express from "express";
import axios from "axios";

const app = express();

const FAST2SMS_KEY = process.env.FAST2SMS_KEY;

app.get("/http-api.php", async (req, res) => {
  const { username, password, sender, to, message } = req.query;

  try {
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: FAST2SMS_KEY,
        route: "dlt",
        sender_id: sender,
        numbers: to,
        message: message,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "SMS sending failed",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SMS Bridge running on port " + PORT);
});
