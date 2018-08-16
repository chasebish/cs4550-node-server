const mongoose = require('mongoose')
const quizSchema = require('./quiz.schema.server')

const quizModel = mongoose.model('QuizModel', quizSchema)

const createQuiz = quiz => quizModel.create(quiz)

const findAllQuizzes = () => quizModel.find()

const findQuizById = quizId =>
    quizModel.findOne({ _id: quizId })

const updateQuiz = (quizId, newQuiz) =>
    quizModel.update({ _id: quizId }, { $set: newQuiz })

const deleteQuiz = quizId => quizModel.remove({ _id: quizId })

module.exports = {
    createQuiz,
    findAllQuizzes,
    findQuizById,
    updateQuiz,
    deleteQuiz
}