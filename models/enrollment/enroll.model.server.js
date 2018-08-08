const mongoose = require('mongoose')
const enrollSchema = require('./enroll.schema.server')
const enrollModel = mongoose.model('EnrollModel', enrollSchema)

const enrollStudentInSection = (enrollment) => 
    enrollModel.create(enrollment)
//     const enrollment = {
//         studentId: userId,
//         sectionId: sectionId
//     }
//     return enrollModel.create(enrollment)
// }


const findSectionsForStudent = (studentId) => 
    enrollModel.find({studentId: studentId})
        .populate('sectionId')
        .exec()

const dropSection = (enrollId) => 
    enrollModel.findByIdAndDelete(enrollId)


module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    dropSection: dropSection
}