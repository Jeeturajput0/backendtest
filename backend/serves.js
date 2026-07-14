const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
const app = express();
const port = 3000;
const mongoosedb = require("./config/db");
mongoosedb();
app.use(express.json());
app.use(cors())
const auth = require("./routes/auth.routes");
const protectedRoute = require("./routes/protected.route");

app.use("/api/user", auth);
app.use("/api", protectedRoute);

app.listen(port, () => {
  console.log(`server is runing http://localhost:${port}`);
});
