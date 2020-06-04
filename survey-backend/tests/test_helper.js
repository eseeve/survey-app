const Survey = require('../models/survey')

const initialSurveys = [
  {
    name: 'Food Survey',
    questions: [
      {
        type: 'MultipleChoice ',
        title: 'What is your favorite ice cream? ',
        options: [
          'Vanilla ',
          'Chocolate ',
          'Strawberry',
        ]
      },
      {
        type: 'MultipleChoice ',
        title: 'What is your favorite restaurant? ',
        options: [
          'Blanko ',
          'Tintå ',
          'Nerå ',
        ]
      }
    ]
  },
  {
    name: 'Animal Survey',
    questions: [
      {
        type: 'MultipleChoice ',
        title: 'What is your favorite dog breed? ',
        options: [
          'Corgi ',
          'Golden retriever ',
          'Pitbull ',
        ]
      },
      {
        type: 'MultipleChoice ',
        title: 'What is your favorite cat breed? ',
        options: [
          'Burma ',
          'Ragdoll ',
          'Siamese ',
        ]
      }
    ]
  },
]

const nonExistingId = async () => {
  const survey = new Survey({ name: 'willremovethissoon' })
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