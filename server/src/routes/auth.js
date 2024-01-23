const router = require('express').Router();
router.post('/signup',handleSignup);
router.post('/login',handleLogin)
router .get ('/logout',hnadleLogout)

module.exports = authRouter;