const mongoose = require('mongoose')
const sectionSchema = require('./section.schema.server')

const sectionModel = mongoose.model('SectionModel', sectionSchema)
// const userModel = require('../user/user.model.server')

const findAllSections = () =>
    sectionModel.find()

const findAllSectionsForCourse = courseId =>
    sectionModel.find({ courseId: courseId })

const createSection = section =>
    sectionModel.create(section)

const deleteSection = sectionId =>
    sectionModel.findByIdAndDelete(sectionId)

const updateSection = (sectionId, section) =>
    sectionModel.update({ _id: sectionId }, { $set: section }, { upsert: true })

const addSeat = (sectionId) =>
    sectionModel.update({ _id: sectionId }, { $inc: { seats: +1 } })

const subSeat = (sectionId) =>
    sectionModel.update({ _id: sectionId }, { $inc: { seats: -1 } })

const findSection = (sectionId) =>
    sectionModel.findOne({ _id: sectionId })

// const enroll = (userId, sectionId) =>
//     userModel.findUserById(userId)
//         .then(user => {
//             user.sections.push(sectionId)
//             return user.save()
//         })

module.exports = {
    findAllSections,
    findAllSectionsForCourse,
    createSection,
    deleteSection,
    updateSection,
    addSeat,
    subSeat,
    findSection
}
