const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static('public'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://whiteboard-angular-chasebish.herokuapp.com/api')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    maxAge: Date.now() + (30 * 1800000)
}))

mongoose.connect('mongodb://chase:espresso8@ds115472.mlab.com:15472/heroku_bb57t8vs')

require('./services/user.service.server')(app)
require('./services/section.service.server')(app)
require('./services/enroll.service.server')(app)

app.listen(process.env.PORT || 3000)