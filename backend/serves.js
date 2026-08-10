const dotenv = require("dotenv");
dotenv.config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 2000;
const mongoosedb = require("./config/db");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoosedb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
const auth = require("./routes/auth.routes");
const protectedRoute = require("./routes/protected.route");
const website = require("./routes/website.route");
const uploadImage = require("./routes/uploadImage.route");
const orderRoutes = require("./routes/oder.routes");


app.use("/api/user", auth);
app.use("/api/admin", protectedRoute);
app.use("/api", website);
app.use("/api/upload", uploadImage);
app.use("/api/order", orderRoutes);

app.listen(port, () => {
  console.log(`server is runing http://localhost:${port}`);
});
