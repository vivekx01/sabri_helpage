// Basic Express server setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Sabri Helpage backend is running');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
