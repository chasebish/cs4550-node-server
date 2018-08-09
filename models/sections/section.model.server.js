const mongoose = require('mongoose')
const sectionSchema = require('./section.schema.server')

const sectionModel = mongoose.model('SectionModel', sectionSchema)

const findAllSections = () =>
    sectionModel.find()

const findAllSectionsForCourse = courseId =>
    sectionModel.find({ courseId: courseId })

const createSection = section =>
    sectionModel.create(section)

const deleteSection = sectionId =>
    sectionModel.findByIdAndDelete(sectionId)

const updateSection = (sectionId, section) =>
    sectionModel.findByIdAndUpdate(sectionId, section)

const addSeat = (sectionId) =>
    sectionModel.update({ _id: sectionId }, { $inc: { seats: +1 } })

const subSeat = (sectionId) =>
    sectionModel.update({ _id: sectionId }, { $inc: { seats: -1 } })

const findSection = (sectionId) =>
    sectionModel.findOne({ _id: sectionId })

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
