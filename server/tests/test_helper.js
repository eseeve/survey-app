const Survey = require('../models/survey')

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

const nonExistingId = async () => {
  const survey = new Survey({ name: 'willremovethissoon', answers: 0 })
  await survey.save()
  await survey.remove()

  return survey._id.toString()
}

const surveysInDb = async () => {
  const surveys = await Survey.find({})
  return surveys.map(survey => survey.toJSON())
}

module.exports = {
  initialSurveys, nonExistingId, surveysInDb,
}