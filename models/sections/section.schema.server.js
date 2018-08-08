const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    title: String,
    courseId: String,
    seats: Number
}, { collection: 'section' })
