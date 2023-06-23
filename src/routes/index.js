const express = require('express')
const router = express.Router()
const accountRouter = require('./account')
const authRouter = require('./auth')
const queryRouter = require('./query')
const consdynamicRouter = require('./cons_dynamic')
const consfixedRouter = require('./cons_fixed')




module.exports = router