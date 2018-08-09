const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SectionModel' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    grade: String
}, { collection: 'enroll' })