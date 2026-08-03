const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controller/authController");
const { register ,login} = require("../controller/usercontroller");

router.post("/register", register);
router.post("/login", login);
router.get(
"/google",
passport.authenticate("google",{
scope:["profile","email"],
session: false
})
);

router.get(
"/google/callback",
passport.authenticate("google",{
session:false,
failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
}),
authController.googleLogin
);
module.exports = router;
