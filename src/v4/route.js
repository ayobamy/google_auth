const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
  res.render("index");
})

router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get("/auth/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  jwt.sign(
    { user: req.user },
    "secretKey",
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        return res.json({
          token: null,
        });
      }
      res.json({
        token,
      });
    }
  );
});

router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  console.log(req.user);
  res.send("Welcome");
});

module.exports = router;
