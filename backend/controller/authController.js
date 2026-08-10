const jwt = require("jsonwebtoken");

const googleLogin = (req, res) => {
  if (!req.user) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
    );
  }

  const token = jwt.sign(
    {
      userId: req.user._id.toString(),
      email: req.user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );
  const redirectUrl = new URL("/google-success", process.env.FRONTEND_URL);
  redirectUrl.searchParams.set("token", token);
  return res.redirect(redirectUrl.toString());
};

module.exports = { googleLogin };
