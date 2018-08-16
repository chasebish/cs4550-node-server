const mongoose = require('mongoose')
const submissionSchema = require('./submission.schema.server')

const submissionModel = mongoose.model('SubmissionModel', submissionSchema)

const findSubmissions = (quizId, studentId) => submissionModel.find({ quiz: quizId, student: studentId })

const findSubmission = (submissionId, studentId) => submissionModel.findOne({ _id: submissionId, student: studentId })


const createSubmission = (submission, student) => {

    const quiz = submission.quiz
    const rawAnswers = submission.answers
    const timestamp = submission.timestamp

    let answers = []

    rawAnswers.forEach(question => {

        const type = question.questionType
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
            answer.fillBlanksAnswers = question.fillBlanksAnswers
            console.log(answer.fillBlankAnswers)
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

    })

    const finalSubmission = {
        student,
        quiz,
        answers,
        timestamp
    }

    console.log(finalSubmission.answers)

    return submissionModel.create(finalSubmission)

}

module.exports = {
    findSubmissions,
    findSubmission,
    createSubmission
}