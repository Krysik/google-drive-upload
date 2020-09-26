const express = require('express');


const app = express();

app.get('/health-check', (req, res) => {
  res.json({status: "Ok"});
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
