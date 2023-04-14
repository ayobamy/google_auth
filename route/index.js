const express = require('express');
const passport = require('passport');
const UserController = require('../controller/UserController');

const router = express.Router();

router.get('/', UserController.checkAuth);
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    UserController.login
);
router.get('/logout', UserController.logout);

module.exports = router;
