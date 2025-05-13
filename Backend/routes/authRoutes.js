import express from "express";
import passport from "passport";

const authRouter = express.Router();

// Google login
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  (req, res) => {
    if (req.user.isNew) {
      return res.redirect("/complete-registration");
    }
    res.redirect("/dashboard");
  }
);

// Logout
authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.error("Logout error:", err);
    res.redirect("/");
  });
});

export default authRouter;
