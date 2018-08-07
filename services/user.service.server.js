module.exports = app => {

    const userModel = require('../models/user/user.model.server')

    const register = (req, res) => {
        const user = req.body
        const newUser = {
            username: user.username,
            password: user.password
        }

        console.log(newUser)

        userModel.findUserByUsername(user.username)
            .then(user => {
                console.log('out if')
                if (!user) {
                    console.log('1st')
                    return userModel.createUser(newUser)
                }
            })
            .then(user => {
                console.log('2nd')
                req.session['currentUser'] = user
                res.send(req.session['currentUser'])
            })
    }

    const login = (req, res) => {
        const user = req.body
        userModel.findUserByCredentials(user.username, user.password)
            .then(user => {
                if (user) {
                    req.session['currentUser'] = user
                    res.send(req.session['currentUser'])
                } else {
                    res.send(0)
                }
            })
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.send(200)
    }

    const profile = (req, res) => {
        res.send(200)
    }

    const currentUser = (req, res) => {
        const currentUser = req.session['currentUser']
        if (currentUser) {
            userModel.findUserByIdExpanded(currentUser._id)
                .then(user => res.send(user))
        } else {
            res.sendStatus(403)
        }
    }

    const findAllUsers = (req, res) => {
        userModel.findAllUsers()
            .then(users => {
                res.send(users)
            })
    }

    app.post('/api/login', login)
    app.post('/api/register', register)
    app.post('/api/logout', logout)
    app.get('/api/profile', profile)
    app.get('/api/currentUser', currentUser)
    app.get('/api/user', findAllUsers)
}