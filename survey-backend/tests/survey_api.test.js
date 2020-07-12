const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const Survey = require('../models/survey')
const User = require('../models/user')
const Quiz = require('../models/quiz')

describe('when there is initially some surveys, quizzes and users saved', () => {
  beforeEach(async () => {
    await Survey.deleteMany({})
    await User.deleteMany({})
    await Quiz.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ name: 'test', username: 'root', passwordHash })

    await user.save()

    const surveyObjects = helper.initialSurveys
      .map(survey => new Survey(survey))
    const surveyPromiseArray = surveyObjects.map(survey => survey.save())
    await Promise.all(surveyPromiseArray)

    const quizObjects = helper.initialQuizzes
      .map(quiz => new Quiz(quiz))
    const quizPromiseArray = quizObjects.map(quiz => quiz.save())
    await Promise.all(quizPromiseArray)
  })

  test('surveys and quizzes are returned as json', async () => {
    await api
      .get('/api/surveys')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .get('/api/quizzes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all surveys and quizzes are returned', async () => {
    const surveyResponse = await api.get('/api/surveys')
    const quizResponse = await api.get('/api/quizzes')

    expect(surveyResponse.body.length).toBe(helper.initialSurveys.length)
    expect(quizResponse.body.length).toBe(helper.initialQuizzes.length)
  })

  test('a specific survey is within the returned surveys', async () => {
    const response = await api.get('/api/surveys')

    const names = response.body.map(r => r.name)
    expect(names).toContain(
      'Animal Survey'
    )
  })

  test('a specific quiz is within the returned quizzes', async () => {
    const response = await api.get('/api/quizzes')

    const names = response.body.map(r => r.name)
    expect(names).toContain(
      'Animal Quiz'
    )
  })

  test('a survey can be updated', async () => {
    let response = await api.get('/api/surveys')
    let userResponse = await api.get('/api/users')
    const surveyToUpdate = response.body[0]
    const user = userResponse.body[0]
    surveyToUpdate.answers = 1
    surveyToUpdate.user = user

    await api
      .put(`/api/surveys/${surveyToUpdate.id}`)
      .send(surveyToUpdate)
      .expect(200)

    response = await api.get('/api/surveys')
    const answers = response.body.map(r => r.answers)
    expect(answers).toContain(1)
  })

  test('a quiz can be updated', async () => {
    let response = await api.get('/api/quizzes')
    let userResponse = await api.get('/api/users')
    const quizToUpdate = response.body[0]
    const user = userResponse.body[0]
    quizToUpdate.answers = 1
    quizToUpdate.user = user

    await api
      .put(`/api/quizzes/${quizToUpdate.id}`)
      .send(quizToUpdate)
      .expect(200)

    response = await api.get('/api/quizzes')
    const answers = response.body.map(r => r.answers)
    expect(answers).toContain(1)
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
      const validNonexistingId = await helper.nonExistingSurveyId()

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

  describe('viewing a specific quiz', () => {

    test('succeeds with a valid id', async () => {
      const quizzesAtStart = await helper.quizzesInDb()

      const quizToView = quizzesAtStart[0]

      const resultQuiz = await api
        .get(`/api/quizzes/${quizToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultQuiz.body).toEqual(quizToView)
    })

    test('fails with statuscode 404 if survey does not exist', async () => {
      const validNonexistingId = await helper.nonExistingQuizId()

      await api
        .get(`/api/quizzes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/quizzes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new survey', () => {
    let headers
    let user

    beforeEach(async () => {
      const newUser = {
        username: 'janedoez',
        name: 'Jane Z. Doe',
        password: 'password',
      }

      await api
        .post('/api/users')
        .send(newUser)

      const result = await api
        .post('/api/login')
        .send(newUser)

      user = result.body

      headers = {
        'Authorization': `bearer ${result.body.token}`
      }
    })

    test('succeeds with valid data and token', async () => {
      const newSurvey = {
        name: 'Drink Survey',
        userId: user.id,
        answers: 0,
        questions: [
          {
            type: 'MultipleChoice',
            title: 'What is your favorite cold drink?',
            options: [
              {
                option: 'Lemonade',
                votes: 0
              },
              {
                option: 'Soda',
                votes: 0
              },
              {
                option: 'Ice tea',
                votes: 0
              }
            ]
          },
          {
            type: 'MultipleChoice',
            title: 'What is your favorite hot drink?',
            options: [
              {
                option: 'Hot Cocoa',
                votes: 0
              },
              {
                option: 'Coffee',
                votes: 0
              },
              {
                option: 'Tea',
                votes: 0
              }
            ]
          }
        ]
      }

      await api
        .post('/api/surveys')
        .send(newSurvey)
        .set(headers)
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
        .set(headers)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const surveysAtEnd = await helper.surveysInDb()

      expect(surveysAtEnd.length).toBe(helper.initialSurveys.length)
    })

    test('fails with status code 401 if token is missing', async () => {
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
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    describe('deletion of a  survey', () => {
      let result
      beforeEach(async () => {
        const newSurvey = {
          name: 'Drink Survey',
          answers: 0,
          questions: [
            {
              type: 'MultipleChoice',
              title: 'What is your favorite cold drink?',
              options: [
                {
                  option: 'Lemonade',
                  votes: 0
                },
                {
                  option: 'Soda',
                  votes: 0
                },
                {
                  option: 'Ice tea',
                  votes: 0
                }
              ]
            },
            {
              type: 'MultipleChoice',
              title: 'What is your favorite hot drink?',
              options: [
                {
                  option: 'Hot Cocoa',
                  votes: 0
                },
                {
                  option: 'Coffee',
                  votes: 0
                },
                {
                  option: 'Tea',
                  votes: 0
                }
              ]
            }
          ]
        }

        result = await api
          .post('/api/surveys')
          .send(newSurvey)
          .set(headers)
      })

      test('succeeds with status code 204 if id is valid and authorized', async () => {
        const surveyToDelete =  result.body
        const initialSurveys = await helper.surveysInDb()

        await api
          .delete(`/api/surveys/${surveyToDelete.id}`)
          .set(headers)
          .expect(204)

        const surveysAtEnd = await helper.surveysInDb()
        expect(surveysAtEnd.length).toBe(initialSurveys.length - 1)

        const names = surveysAtEnd.map(r => r.name)
        expect(names).not.toContain(surveyToDelete.name)
      })
    })
  })

  describe('addition of a new quiz', () => {
    let headers
    let user

    beforeEach(async () => {
      const newUser = {
        username: 'janedoez',
        name: 'Jane Z. Doe',
        password: 'password',
      }

      await api
        .post('/api/users')
        .send(newUser)

      const result = await api
        .post('/api/login')
        .send(newUser)

      user = result.body

      headers = {
        'Authorization': `bearer ${result.body.token}`
      }
    })

    test('succeeds with valid data and token', async () => {
      const newQuiz = {
        name: 'Drink quiz',
        userId: user.id,
        answers: 0,
        questions: [
          {
            title: 'Which of these drinks is served usually cold?',
            correctIndex: 2,
            options: [
              {
                option: 'Tea',
                votes: 0
              },
              {
                option: 'Coffee',
                votes: 0
              },
              {
                option: 'Kombucha',
                votes: 0
              }
            ]
          }
        ]
      }

      await api
        .post('/api/quizzes')
        .send(newQuiz)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/)


      const quizzesAtEnd = await helper.quizzesInDb()
      expect(quizzesAtEnd.length).toBe(helper.initialQuizzes.length + 1)

      const names = quizzesAtEnd.map(s => s.name)
      expect(names).toContain(
        'Drink quiz'
      )
    })

    test('fails with status code 400 if data invalid', async () => {
      const newQuiz = {
        questions: [
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
        .post('/api/quizzes')
        .send(newQuiz)
        .set(headers)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const quizzesAtEnd = await helper.quizzesInDb()

      expect(quizzesAtEnd.length).toBe(helper.initialQuizzes.length)
    })

    test('fails with status code 401 if token is missing', async () => {
      const newQuiz = {
        name: 'Drink quiz',
        userId: user.id,
        answers: 0,
        questions: [
          {
            title: 'Which of these drinks is served usually cold?',
            correctIndex: 2,
            options: [
              {
                option: 'Tea',
                votes: 0
              },
              {
                option: 'Coffee',
                votes: 0
              },
              {
                option: 'Kombucha',
                votes: 0
              }
            ]
          }
        ]
      }

      await api
        .post('/api/quizzes')
        .send(newQuiz)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    describe('deletion of a quiz', () => {
      let result
      beforeEach(async () => {
        const newQuiz = {
          name: 'Drink quiz',
          userId: user.id,
          answers: 0,
          questions: [
            {
              title: 'Which of these drinks is served usually cold?',
              correctIndex: 2,
              options: [
                {
                  option: 'Tea',
                  votes: 0
                },
                {
                  option: 'Coffee',
                  votes: 0
                },
                {
                  option: 'Kombucha',
                  votes: 0
                }
              ]
            }
          ]
        }
        result = await api
          .post('/api/quizzes')
          .send(newQuiz)
          .set(headers)
      })

      test('succeeds with status code 204 if id is valid and authorized', async () => {
        const quizToDelete =  result.body
        const initialQuizzes = await helper.quizzesInDb()

        await api
          .delete(`/api/quizzes/${quizToDelete.id}`)
          .set(headers)
          .expect(204)

        const quizzesAtEnd = await helper.surveysInDb()
        expect(quizzesAtEnd.length).toBe(initialQuizzes.length - 1)

        const names = quizzesAtEnd.map(r => r.name)
        expect(names).not.toContain(quizToDelete.name)
      })
    })
  })

  describe('when there is initially one user at db', () => {
    let headers
    let user

    beforeEach(async () => {
      const newUser = {
        username: 'janedoez',
        name: 'Jane Z. Doe',
        password: 'password',
      }

      user = await api
        .post('/api/users')
        .send(newUser)

      const result = await api
        .post('/api/login')
        .send(newUser)

      headers = {
        'Authorization': `bearer ${result.body.token}`
      }
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'eseeve',
        name: 'Elias Seeve',
        password: 'sekred',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'r',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(' is shorter than the minimum allowed length (3)')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


    test('creation fails with proper statuscode and message if password is too short', async () => {
      const newUser = {
        username: 'janedoe',
        name: 'Jane Doe',
        password: 'p',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password must have min length of 5')
    })

    test('deletion succeeds with correct authorization', async () => {
      const initialUsers = await helper.usersInDb()
      const userToDelete = user.body

      const result = await api
        .delete(`/api/users/${userToDelete.id}`)
        .set(headers)
        .expect(204)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(initialUsers.length - 1)

      const names = usersAtEnd.map(r => r.name)
      expect(names).not.toContain(result.name)
    })

    test('deletion fails without correct authorization', async () => {
      const initialUsers = await helper.usersInDb()
      const userToDelete = user.body

      await api
        .delete(`/api/users/${userToDelete.id}`)
        .expect(401)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(initialUsers.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})