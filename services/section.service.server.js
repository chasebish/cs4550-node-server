module.exports = app => {
    const sectionModel = require('../models/sections/section.model.server')

    const enrollUser = (req, res) => {
        const currentUser = req.session['currentUser']
        if (currentUser) {
            sectionModel
                .enroll(currentUser._id, req.params['sectionId'])
                .then(() => res.send(currentUser))
        } else {
            res.sendStatus(404)
        }
    }

    const createSection = (req, res) => {
        sectionModel
            .createSection(req.body)
            .then(section => res.send(section))
    }

    const findSectionsForCourse = (req, res) => {
        sectionModel
            .findAllSectionsForCourse(req.params['courseId'])
            .then(sections => res.send(sections))
    }

    const findAllSections = (req, res) => {
        sectionModel
            .findAllSections()
            .then(sections => res.send(sections))
    }


    app.put('/api/section/:sectionId/enroll', enrollUser)
    app.post('/api/section', createSection)
    app.get('/api/course/:courseId/section', findSectionsForCourse)
    app.get('/api/section', findAllSections)

}
