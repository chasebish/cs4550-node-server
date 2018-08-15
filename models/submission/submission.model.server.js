const mongoose = require('mongoose')
const submissionSchema = require('./submission.schema.server')

const submissionModel = mongoose.model('SubmissionModel', submissionSchema)

const findSubmissions = (quizId, studentId) => submissionModel.find({ quiz: quizId, student: studentId })

const findSubmission = (quizId, studentId) => submissionModel.findOne({ quiz: quizId, student: studentId })

const createSubmission = (quiz, student) => {

    const timestamp = new Date()
    const questions = quiz.questions
    let answers = []

    questions.forEach(question => {

        const type = question.type
        let answer = {
            title: question.title,
            points: question.points,
            description: question.description,
            choices: question.choices,
            blanks: question.blanks,
            questionType: type
        }

        if (type === 'ESSAY') {
            answer.essayAnswer = question.essayAnswer
        }
        else if (type === 'FILL_BLANKS') {
            answer.fillBlankAnswers = question.fillBlankAnswers
        }
        else if (type === 'TRUE_FALSE') {
            answer.trueFalseAnswer = question.trueFalseAnswer
        }
        else if (type === 'CHOICE') {
            answer.multipleChoiceAnswer = question.multipleChoiceAnswer
        }
        else {
            console.warn('NO MATCH', type)
        }

        answers.push(answer)
        console.log(answer)

    })

    const submission = {
        student,
        quiz,
        answers,
        timestamp
    }

    return submissionModel.create(submission)

}

module.exports = {
    findSubmissions,
    findSubmission,
    createSubmission
}