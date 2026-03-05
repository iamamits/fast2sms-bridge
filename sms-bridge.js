import express from "express";
import axios from "axios";

const app = express();

const FAST2SMS_KEY = process.env.FAST2SMS_KEY;
const TEMPLATE_ID = process.env.DLT_TEMPLATE_ID;
const ENTITY_ID = process.env.DLT_ENTITY_ID;

app.get("/http-api.php", async (req, res) => {
  const { sender, to, message } = req.query;

  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "dlt",
        sender_id: sender,
        message: message,
        language: "english",
        numbers: to,
        flash: 0,
        entity_id: process.env.ENTITY_ID,
        template_id: process.env.CONTENT_TEMPLATE_ID,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_KEY,
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
  console.log("SMS bridge running");
});
