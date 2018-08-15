const mongoose = require('mongoose')
const questionSchema = require('./question.schema.server')

const questionModel = mongoose.model('QuestionModel', questionSchema)

const findAllQuestions = () => questionModel.find()

const findQuestionById = questionId => questionModel.findOne({ _id: questionId })

module.exports = {
    findAllQuestions,
    findQuestionById
}