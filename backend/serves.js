const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();
const app = express();
const port = 3000;
const mongoosedb = require("./config/db");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoosedb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const auth = require("./routes/auth.routes");
const protectedRoute = require("./routes/protected.route");
const website = require("./routes/website.route");

app.use("/api/user", auth);
app.use("/api/admin", protectedRoute);
app.use("/api", website);

app.listen(port, () => {
  console.log(`server is runing http://localhost:${port}`);
});
