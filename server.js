const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
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
    secret: 'any string'
}))

mongoose.connect('mongodb://localhost/webdev')

const userService = require('./services/user.service.server')
userService(app)

const sectionService = require('./services/section.service.server')
sectionService(app)

app.listen(3000)

// const login = (req, res) => {
//     const user = req.body
//     userModel.findOne({ username: user.username, password: user.password})
//         .then(localUser => {
//             req.session['currentUser'] = localUser
//             res.send(req.session)
//         })
// }

// const register = (req, res) => {
//     const user = req.body
//     const newUser = {
//         username: user.username,
//         password: user.password
//     }

//     userModel.find

// }

// const currentUser = (req, res) => {
//     res.send(req.session)
// }

// const setSession = (req, res) => {
//     const name = req.params['name']
//     const value = req.params['value']
//     req.session[name] = value
//     res.send(req.session)
// }

// const getSession = (req, res) => {
//     const name = req.params['name']
//     const value = req.session[name]
//     res.send(value)
// }

// app.post('/api/register', register)

// app.post('/api/login', login)
// app.get('/api/currentUser', currentUser)

// app.get('/api/session/set/:name/:value', setSession)
// app.get('/api/session/get/:name', getSession)

// const userSchema = mongoose.Schema({
//     username: String,
//     password: String,
//     firstName: String,
//     lastName: String
// }, { collection: 'user' })

// const userModel = mongoose.model('UserModel', userSchema)

// app.get('/api/user', (req, res) => {
//     userModel.find()
//         .then(users => res.send(users))
// })

// app.listen(3000)