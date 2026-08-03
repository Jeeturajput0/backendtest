const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();
const app = express();
const port = process.env.PORT || 2000;
const mongoosedb = require("./config/db");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoosedb();
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize())

app.use(passport.session())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const auth = require("./routes/auth.routes");
const protectedRoute = require("./routes/protected.route");
const website = require("./routes/website.route");
const uploadImage = require("./routes/uploadImage.route");
const vendor = require("./routes/vendor.routes");

app.use("/api/user", auth);
app.use("/api/admin", protectedRoute);
app.use("/api/vendor", vendor);
app.use("/api", website);
app.use("/api/upload", uploadImage);

app.listen(port, () => {
  console.log(`server is runing http://localhost:${port}`);
});
