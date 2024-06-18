const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 4000;
const logging = require("./middleware/logging");
const userRoutes = require("./routes/users");

app.use(express.json());
app.use(cors());
app.use(logging);

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
