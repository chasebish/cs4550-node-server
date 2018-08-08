const mongoose = require('mongoose')
const userSchema = require('./user.schema.server')

const userModel = mongoose.model('UserModel', userSchema)

const findAllUsers = () =>
    userModel.find()

const findUserByCredentials = (username, password) =>
    userModel.findOne({ username, password })

const findUserByUsername = username =>
    userModel.findOne({ username })

const findUserById = userId =>
    userModel.findById(userId)

const findUserByIdExpanded = userId =>
    userModel
        .findById(userId)
        .populate('sections')
        .exec()

const createUser = user =>
    userModel.create(user)

const deleteUser = userId =>
    userModel.remove({ _id: userId })

const updateUser = (userId, user) =>
    userModel.update({ _id: userId }, { $set: user }, { upsert: true })

module.exports = {
    findAllUsers,
    findUserByCredentials,
    findUserByUsername,
    findUserById,
    findUserByIdExpanded,
    createUser,
    deleteUser,
    updateUser
}
