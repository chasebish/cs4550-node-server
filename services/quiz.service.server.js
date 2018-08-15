module.exports = app => {
    const quizModel = require('../models/quiz/quiz.model.server')

    const createQuiz = (req, res) => {
        const quiz = req.body
        quizModel.createQuiz(quiz)
            .then(quiz => res.send(quiz))
    }

    const findAllQuizzes = (req, res) => {
        quizModel.findAllQuizzes()
            .then(quizzes => res.send(quizzes))
    }

    const findQuizById = (req, res) => {
        quizModel.findQuizById(req.params['quizId'])
            .then(quiz => res.send(quiz))
    }

    const updateQuiz = (req, res) => {
        const newQuiz = req.body
        quizModel.updateQuiz(req.params['quizId'], newQuiz)
            .then(quiz => res.send(quiz))
    }

    const deleteQuiz = (req, res) => {
        quizModel.deleteQuiz(req.params['quizId'])
            .then(() => res.sendStatus(200))
    }

    app.post('/api/quiz', createQuiz)
    app.get('/api/quiz', findAllQuizzes)
    app.get('/api/quiz/:quizId', findQuizById)
    app.put('/api/quiz/:quizId', updateQuiz)
    app.delete('/api/quiz/:quizId', deleteQuiz)
}