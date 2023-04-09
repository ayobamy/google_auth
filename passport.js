const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = passport.serializeUser((user , done) => {
	done(null , user);
})

module.exports = passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = passport.use(new GoogleStrategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL:"http://localhost:3000/auth/callback",
	passReqToCallback:true
},

module.exports = function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));
