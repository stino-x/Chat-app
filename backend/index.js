const express = require("express");
const cors = require("cors");
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "7a5afab5-b74d-458f-b2ba-527e6210662d" },
        timeout: 1000 }
    );
    // Send status and JSON data in one step
    res.status(r.status).json(r.data);
  } catch (e) {
    if (e.response) {
      // Response received from server with an error status
      res.status(e.response.status).json(e.response.data);
    } else if (e.code === 'ECONNABORTED') {
      console.error('Request timed out:', e);
      res.status(504).json({ error: 'Request timed out' });
    } else if (e.code === 'ECONNRESET') {
      console.error('Connection was reset:', e);
      res.status(503).json({ error: 'Connection was reset' });
    } else {
      console.error('An error occurred:', e);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
