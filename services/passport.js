const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('user does not exist')
    }
    done(null, user);
  } catch (err) {
    console.log(`deserializeUser Error: ${err}`)
  }
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));
