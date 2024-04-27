const express = require("express");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r  = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "7a5afab5-b74d-458f-b2ba-527e6210662d" } }
    )
    return res.sendStatus(r.status).json(r.data);
  } catch (e) {
    return res.sendStatus(e.response.status).json(e.response.data);
  }
});

app.listen(3001);