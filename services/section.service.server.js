module.exports = app => {
    const sectionModel = require('../models/sections/section.model.server')

    const createSection = (req, res) => {
        sectionModel
            .createSection(req.body)
            .then(section => res.send(section))
    }

    const getSection = (req, res) => {
        const sectionId = req.params['sectionId']
        sectionModel.findSection(sectionId)
            .then(section => res.send(section), () => res.sendStatus(404))
    }

    const deleteSection = (req, res) => {
        const sectionId = req.params['sectionId']
        sectionModel.deleteSection(sectionId)
            .then(() => res.send(200), () => res.send(404))
    }

    const updateSection = (req, res) => {
        const sectionId = req.params['sectionId']
        const section = req.body
        sectionModel.updateSection(sectionId, section)
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

    app.post('/api/course/:courseId/section', createSection)
    app.get('/api/course/:courseId/section', findSectionsForCourse)
    app.get('/api/section/:sectionId', getSection)
    app.delete('/api/section/:sectionId', deleteSection)
    app.put('/api/section/:sectionId', updateSection)
    app.get('/api/section', findAllSections)

}
