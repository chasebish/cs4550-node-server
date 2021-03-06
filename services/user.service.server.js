module.exports = app => {

    const userModel = require('../models/user/user.model.server')

    const register = (req, res) => {
        const user = req.body
        const newUser = {
            username: user.username,
            password: user.password
        }

        userModel.findUserByUsername(user.username)
            .then(user => {
                if (!user) {
                    return userModel.createUser(newUser)
                        .then(user => {
                            req.session['currentUser'] = user
                            res.send(req.session['currentUser'])
                        })
                } else {
                    res.sendStatus(404)
                }
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
                    res.sendStatus(404)
                }
            })
    }

    const updateUser = (req, res) => {
        const currentUser = req.session['currentUser']
        const updatedUser = req.body
        userModel.updateUser(currentUser, updatedUser)
            .then(user => res.send(user), () => res.send(404))
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.send(200)
    }

    const getUser = (req, res) => {
        const currentUser = req.session['currentUser']
        if (currentUser) {
            userModel.findUserByIdExpanded(currentUser._id)
                .then(user => res.send(user))
        } else {
            res.sendStatus(404)
        }
    }

    const deleteUser = (req) => {
        const currentUser = req.session['currentUser']
        userModel.deleteUser(currentUser)
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
    app.put('/api/profile', updateUser)
    app.get('/api/profile', getUser)
    app.delete('/api/profile', deleteUser)
    app.get('/api/user', findAllUsers)
}