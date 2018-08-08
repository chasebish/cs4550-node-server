module.exports = app => {
    const sectionModel = require('../models/sections/section.model.server')
    // const enrollModel = require('../models/enroll/enroll.model.server')

    // const enrollUser = (req, res) => {
    //     const currentUser = req.session['currentUser']
    //     if (currentUser) {
    //         sectionModel
    //             .enroll(currentUser._id, req.params['sectionId'])
    //             .then(() => res.send(currentUser))
    //     } else {
    //         res.sendStatus(404)
    //     }
    // }

    const createSection = (req, res) => {
        sectionModel
            .createSection(req.body)
            .then(section => res.send(section))
    }

    const deleteSection = (req, res) => {
        const section = req.params['sectionId']
        sectionModel.deleteSection(section)
            .then(sections => res.send(sections))
    }

    const updateSection = (req, res) => {
        const section = req.params['sectionId']
        sectionModel.updateSection(section, req.body)
            .then(section => res.send(section), () => res.sendStatus(404))
    }

    const findSectionsForCourse = (req, res) => {
        const course = req.params['courseId']
        sectionModel
            .findAllSectionsForCourse(course)
            .then(sections => res.send(sections))
    }

    const findAllSections = (req, res) => {
        sectionModel
            .findAllSections()
            .then(sections => res.send(sections))
    }

    // const enrollStudent = (req, res) => {
    //     const sectionId = req.params['sectionId']
    //     sectionModel.findSection(sectionId)
    //         .then(section)
    // }


    app.post('/api/course/:courseId/section', createSection)
    app.delete('/api/section/:sectionId', deleteSection)
    app.put('/api/section/:sectionId', updateSection)
    app.get('/api/course/:courseId/section', findSectionsForCourse)
    app.get('/api/section', findAllSections)

}
