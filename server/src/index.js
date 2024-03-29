const express = require("express");
const PORT = 8080;

const app = express();

// Define a route handler for the root endpoint
app.get("/", (req, res) => {
  res.send("Hello World! This is your basic Node.js API endpoint.");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
