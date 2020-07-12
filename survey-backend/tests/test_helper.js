const Survey = require('../models/survey')
const User = require('../models/user')
const Quiz = require('../models/quiz')

const initialSurveys = [
  {
    name: 'Food Survey',
    answers: 0,
    questions: [
      {
        type: 'MultipleChoice',
        title: 'What is your favorite ice cream?',
        options: [
          {
            option: 'Vanilla',
            votes: 0
          },
          {
            option: 'Chocolate',
            votes: 0
          },
          {
            option: 'Strawberry',
            votes: 0
          }
        ]
      },
      {
        type: 'MultipleChoice',
        title: 'What is your favorite restaurant?',
        options: [
          {
            option: 'Blanko',
            votes: 0
          },
          {
            option: 'Tintå',
            votes: 0
          },
          {
            option: 'Nerå',
            votes: 0
          }
        ]
      }
    ]
  },
  {
    name: 'Animal Survey',
    answers: 0,
    questions: [
      {
        type: 'MultipleChoice',
        title: 'What is your favorite dog breed?',
        options: [
          {
            option: 'Corgi',
            votes: 0
          },
          {
            option: 'Golden retriever',
            votes: 0
          },
          {
            option: 'Pitbull',
            votes: 0
          }
        ]
      },
      {
        type: 'MultipleChoice',
        title: 'What is your favorite cat breed?',
        options: [
          {
            option: 'Burma',
            votes: 0
          },
          {
            option: 'Ragdoll',
            votes: 0
          },
          {
            option: 'Siamese',
            votes: 0
          }
        ]
      }
    ]
  }
]

const initialQuizzes = [
  {
    name: 'Country quiz',
    answers: 0,
    questions: [
      {
        title: 'What is The largest country by area?',
        correctIndex: 0,
        options: [
          {
            option: 'Russia',
            votes: 0
          },
          {
            option: 'China',
            votes: 0
          },
          {
            option: 'Usa',
            votes: 0
          }
        ]
      },
      {
        title: 'What is The largest country by population?',
        correctIndex: 2,
        options: [
          {
            option: 'Russia',
            votes: 0
          },
          {
            option: 'China',
            votes: 0
          },
          {
            option: 'India',
            votes: 0
          }
        ]
      }
    ]
  },
  {
    name: 'Animal Quiz',
    answers: 0,
    questions: [
      {
        title: 'Which dog breed is the largest?',
        correctIndex: 2,
        options: [
          {
            option: 'Corgi',
            votes: 0
          },
          {
            option: 'Golden retriever',
            votes: 0
          },
          {
            option: 'The Great Dane',
            votes: 0
          }
        ]
      },
    ]
  }
]

const nonExistingSurveyId = async () => {
  const survey = new Survey({ name: 'willremovethissoon', answers: 0 })
  await survey.save()
  await survey.remove()

  return survey._id.toString()
}

const nonExistingQuizId = async () => {
  const quiz = new Quiz({ name: 'willremovethissoon', answers: 0 })
  await quiz.save()
  await quiz.remove()

  return quiz._id.toString()
}

const surveysInDb = async () => {
  const surveys = await Survey.find({})
  return surveys.map(survey => survey.toJSON())
}

const quizzesInDb = async () => {
  const quizzes = await Quiz.find({})
  return quizzes.map(quiz => quiz.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialSurveys, initialQuizzes, nonExistingSurveyId, nonExistingQuizId, surveysInDb, quizzesInDb, usersInDb,
}