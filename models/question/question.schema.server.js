const mongoose = require('mongoose')
module.exports = mongoose.Schema({

    // default question fields
    title: String,
    points: Number,
    description: String,
    questionType: {
        type: String,
        enum: ['ESSAY', 'FILL_BLANKS', 'TRUE_FALSE', 'CHOICE']
    },

    // question types
    blanks: [String],
    choices: [{
        text: String,
        choiceValue: String
    }],

    // answers
    essayAnswer: String,
    fillBlanksAnswers: {},
    trueFalseAnswer: Boolean,
    multipleChoiceAnswer: String

}, { collection: 'question' })