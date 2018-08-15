const mongoose = require('mongoose')
module.exports = mongoose.Schema({

    // student that submitted
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },

    // quiz taken by student
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },

    // student's answers
    answers: [{
        // question schema
        title: String,
        points: Number,
        description: String,
        questionType: {
            type: String,
            enum: ['ESSAY', 'FILL_BLANKS', 'TRUE_FALSE', 'CHOICE']
        },

        blanks: [String],
        choices: [{
            text: String,
            choiceValue: String
        }],

        essayAnswer: String,
        fillBlanksAnswers: {},
        trueFalseAnswer: Boolean,
        multipleChoiceAnswer: String

    }]
}, { collection: 'submission' })