const dotenv = require("dotenv");
dotenv.config({ path: require("path").join(__dirname, ".env") });

const express = require("express");
const session = require("express-session");
// Passport reads GOOGLE_CLIENT_ID while it is being configured.  dotenv must
// therefore be loaded before this import.
const passport = require("./config/passport");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 2000;
const mongoosedb = require("./config/db");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoosedb();
app.use(
  session({
    secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());

app.use(passport.session());
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
const vendor = require("./routes/vendor.routes");
const orderRoutes = require("./routes/oder.routes");
const paymentRoutes = require("./routes/payment.routes");


app.use("/api/user", auth);
app.use("/api/admin", protectedRoute);
app.use("/api/vendor", vendor);
app.use("/api", website);
app.use("/api/upload", uploadImage);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);



app.listen(port, () => {
  console.log(`server is runing http://localhost:${port}`);
});
