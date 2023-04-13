const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passportJWT = require('passport-jwt');
const User = require('./UserModel');

const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const { CLIENT_ID, CLIENT_SECRET } = process.env;

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'https://ayobamy-miniature-eureka-j7g6wxpvgw4h54gv-3000.preview.app.github.dev/auth/google/callback',
    passReqToCallback : true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      console.log('Creating new user...');
      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      })
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      return done(err, false);
    }
  }));

  passport.use(
    new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = jwtPayload.user;
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    })
  );
}
