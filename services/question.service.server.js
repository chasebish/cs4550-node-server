module.exports = app => {
    const questionModel = require('../models/question/question.model.server')

    const findQuestionById = (req, res) => {
        const questionId = req.params['questionId']
        questionModel.findQuestionById(questionId)
            .then(question => res.send(question), () => res.sendStatus(404))
    }

    const findQuestions = (req, res) => {
        questionModel.findAllQuestions()
            .then(questions => res.send(questions))
    }

    app.get('/api/question/:questionId', findQuestionById)
    app.get('/api/question/', findQuestions)

}