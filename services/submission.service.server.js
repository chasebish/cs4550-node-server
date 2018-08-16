module.exports = app => {
    const submissionModel = require('../models/submission/submission.model.server')

    const submit = (req, res) => {
        const quiz = req.body
        const user = req.session['currentUser']
        submissionModel.createSubmission(quiz, user)
            .then(submission => res.send(submission))
    }

    const findSubmissions = (req, res) => {
        const quizId = req.params['quizId']
        const user = req.session['currentUser']
        submissionModel.findSubmissions(quizId, user)
            .then(submissions => res.send(submissions))
    }

    const findSubmission = (req, res) => {
        const submissionId = req.params['submissionId']
        const user = req.session['currentUser']
        submissionModel.findSubmission(submissionId, user)
            .then(submission => res.send(submission))
    }

    app.post('/api/quiz/:quizId/submission', submit)
    app.get('/api/quiz/:quizId/submission', findSubmissions)
    app.get('/api/quiz/:quizId/submission/:submissionId', findSubmission)

}