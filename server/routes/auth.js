const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User')

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACKURL
},
    async function (accessToken, refreshToken, profile, done) {

        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImage: profile.photos[0].value
        }
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                done(null, user)
            } else {
                user = await User.create(newUser);
                done(null, user)
            }
        } catch (error) {
            console.log(error);

        }
    }
));

//Google login route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

//google user data
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: '/dashboard'
    })
);

//route if something goes wrong
router.get('login-failure', (req, res) => {
    res.send('Something went wrong...')
})
module.exports = router;

//destroy user session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error);
            res.send('Error login out')
        } else {
            res.redirect('/')
        }
    })
})


//Presist user data after successful authentication
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//Retrieve user datafrom session
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id)
        done(null, user);
    } catch (err) {
        done(err)
    }
})

module.exports = router;