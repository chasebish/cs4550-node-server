module.exports = app => {
    const enrollModel = require('../models/enrollment/enroll.model.server')

    const enrollStudent = (req, res) => {
        const studentId = req.params['studentId']
        const sectionId = req.params['sectionId']
        const enrollment = {
            studentId,
            sectionId
        }
        enrollModel.enrollStudentInSection(enrollment)
            .then(enrollment => res.send(enrollment))
    }

    const dropSection = (req, res) => {
        const enrollmentId = req.body.enrollmentId
        enrollModel.dropSection(enrollmentId)
            .then(() => res.sendStatus(200))
    }

    const studentSections = (req, res) => {
        const currentUser = req.session['currentUser']
        enrollModel.findSectionsForStudent(currentUser)
            .then((enrollments) => res.send(enrollments))
    }

    app.post('/api/student/:studentId/section/:sectionId', enrollStudent)
    app.delete('/api/student/:studentId/section/:sectionId', dropSection)
    app.get('/api/student/:studentId/section', studentSections)
}