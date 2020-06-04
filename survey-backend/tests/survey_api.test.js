const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Survey = require('../models/survey')

describe('when there is initially some surveys saved', () => {
  beforeEach(async () => {
    await Survey.deleteMany({})

    const surveyObjects = helper.initialSurveys
      .map(survey => new Survey(survey))
    const promiseArray = surveyObjects.map(survey => survey.save())
    await Promise.all(promiseArray)
  })

  test('surveys are returned as json', async () => {
    await api
      .get('/api/surveys')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all surveys are returned', async () => {
    const response = await api.get('/api/surveys')

    expect(response.body.length).toBe(helper.initialSurveys.length)
  })

  test('a specific survey is within the returned surveys', async () => {
    const response = await api.get('/api/surveys')

    const names = response.body.map(r => r.name)
    expect(names).toContain(
      'Animal Survey'
    )
  })

  test('a survey can be updated', async () => {
    let response = await api.get('/api/surveys')
    const surveyToUpdate = response.body[0]
    surveyToUpdate.name = 'Testing Survey Update'

    await api
      .put(`/api/surveys/${surveyToUpdate.id}`)
      .send(surveyToUpdate)
      .expect(200)

    response = await api.get('/api/surveys')
    const names = response.body.map(r => r.name)
    expect(names).toContain(
      'Testing Survey Update'
    )
  })

  describe('viewing a specific survey', () => {

    test('succeeds with a valid id', async () => {
      const surveysAtStart = await helper. surveysInDb()

      const surveyToView = surveysAtStart[0]

      const resultSurvey = await api
        .get(`/api/surveys/${surveyToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultSurvey.body).toEqual(surveyToView)
    })

    test('fails with statuscode 404 if survey does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/surveys/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/surveys/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new survey', () => {
    test('succeeds with valid data', async () => {
      const newSurvey = {
        name: 'Drink Survey',
        questions: [
          {
            type: 'MultipleChoice ',
            title: 'What is your favorite cold drink? ',
            options: [
              'Lemonade',
              'Soda',
              'Ice tea',
            ]
          },
          {
            type: 'MultipleChoice ',
            title: 'What is your favorite hot drink? ',
            options: [
              'Hot Cocoa',
              'Coffee',
              'Tea',
            ]
          }
        ]
      }

      await api
        .post('/api/surveys')
        .send(newSurvey)
        .expect(201)
        .expect('Content-Type', /application\/json/)


      const surveysAtEnd = await helper.surveysInDb()
      expect(surveysAtEnd.length).toBe(helper.initialSurveys.length + 1)

      const names = surveysAtEnd.map(s => s.name)
      expect(names).toContain(
        'Drink Survey'
      )
    })

    test('fails with status code 400 if data invalid', async () => {
      const newSurvey = {
        questions: [
          {
            type: 'MultipleChoice ',
            title: 'What is your favorite cold drink? ',
            options: [
              'Lemonade',
              'Soda',
              'Ice tea',
            ]
          },
          {
            type: 'MultipleChoice ',
            title: 'What is your favorite hot drink? ',
            options: [
              'Hot Cocoa',
              'Coffee',
              'Tea',
            ]
          }
        ]
      }

      await api
        .post('/api/surveys')
        .send(newSurvey)
        .expect(400)

      const surveysAtEnd = await helper.surveysInDb()

      expect(surveysAtEnd.length).toBe(helper.initialSurveys.length)
    })
  })

  describe('deletion of a  survey', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const surveysAtStart = await helper.surveysInDb()
      const surveyToDelete =  surveysAtStart[0]

      await api
        .delete(`/api/surveys/${surveyToDelete.id}`)
        .expect(204)

      const surveysAtEnd = await helper.surveysInDb()

      expect(surveysAtEnd.length).toBe(
        helper.initialSurveys.length - 1
      )

      const names = surveysAtEnd.map(r => r.name)

      expect(names).not.toContain(surveyToDelete.name)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})