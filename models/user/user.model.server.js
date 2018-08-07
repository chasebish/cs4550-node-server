const mongoose = require('mongoose')
const userSchema = require('./user.schema.server')

const userModel = mongoose.model('UserModel', userSchema)

const findAllUsers = () =>
    userModel.find()

const findUserByCredentials = (username, password) =>
    userModel.findOne({ username: username, password: password })

const findUserById = userId =>
    userModel.findById(userId)

const findUserByIdExpanded = userId =>
    userModel
        .findById(userId)
        .populate('sections')
        .exec()

module.exports = {
    findUserByIdExpanded,
    findUserById,
    findAllUsers,
    findUserByCredentials
}
