import storage from '../../src/utils/storage'
describe('Survey app', function() {
  describe('When not signed up', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
    it('Login page can be opened', function() {
      cy.contains('Login to application')
    })
    it('App should have no users or surveys', function() {
      cy.window()
        .its('store')
        .invoke('getState')
        .its('users')
        .should('have.length', 0)
        cy.window()
        .its('store')
        .invoke('getState')
        .its('surveys')
        .should('have.length', 0)
    })
    it('Sign up form can be opened and closed', function() {
      cy.contains('Not a user yet? Click here!')
      cy.contains('here').click()
      cy.contains('Sign up for Survey App')
      cy.contains('Cancel').click()
    })
    it('User can sign up', function() {
      cy.contains('Not a user yet? Click here!')
      cy.contains('here').click()
      cy.contains('Sign up for Survey App')
      cy.get('form').within(function() {
        cy.get('#name').type('Teemu Testaaja')
        cy.get('#username').type('testi')
        cy.get('#password').type('salasana')
        cy.get('#confirmPassword').type('salasana')
        cy.contains('Sign up').click()
      })
      cy.contains('Account created succesfully!')
    })
  })
  describe('When signed up', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Teemu Testaaja',
        username: 'testi',
        password: 'salasana'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
    it('User can login', function() {
      cy.get('form').within(function() {
        cy.get('#username').type('testi')
        cy.get('#password').type('salasana')
        cy.contains('Login').click()
      })
      cy.contains('Survey App')
      cy.contains('Teemu Testaaja welcome back')
    })
    it('Login fails with wrong credentials', function() {
      cy.get('form').within(function() {
        cy.get('#username').type('testi')
        cy.get('#password').type('väärin')
        cy.contains('Login').click()
      })
      cy.contains('Wrong username or password')
    })
    describe('When logged in', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/login', {
          username: 'testi', password: 'salasana'
        }).then(response => {
          localStorage.setItem('loggedSurveyAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
      })
      it('User is saved to store', function() {
        const user = JSON.parse(localStorage.getItem('loggedSurveyAppUser'))
        cy.window()
          .its('store')
          .invoke('getState')
          .its('user')
          .should('deep.equal', user)
      })
      it('User can logout', function() {
        cy.contains('Logout').click()
        cy.contains('Login to application')
        cy.window()
          .its('store')
          .invoke('getState')
          .its('user')
          .should('deep.equal', null)
      })
      it('Survey can be created', function() {
        cy.contains('Create a new survey').click()
        cy.get('form').within(function() {
          cy.get('#name').type('Test Survey')
          cy.get('#add-question').click()
          cy.get('input:last').type('Question 1')
          cy.get('.dropdown-menu').click().type('{enter}')
          cy.get('#add-option').click()
          cy.get('input:last').type('Option 1')
          cy.get('#add-option').click()
          cy.get('input:last').type('Option 2')
          cy.get('#submit').click()
        })
        cy.contains("New survey 'Test Survey' created!")
      })
      describe('When database contains a survey', function() {
        beforeEach(function() {
          cy.request('POST', 'http://localhost:3001/api/testing/resetsurveys')
          cy.createSurvey({
            name: 'Food Survey',
            questions: [
              {
                type: 'MultipleChoice',
                title: 'What is your favorite ice cream?',
                options: [
                  {
                    option: 'Vanilla',
                  },
                  {
                    option: 'Chocolate',
                  },
                  {
                    option: 'Strawberry',
                  }
                ]
              },
              {
                type: 'MultipleChoice',
                title: 'What is your favorite restaurant?',
                options: [
                  {
                    option: 'Blanko',
                  },
                  {
                    option: 'Tintå',
                  },
                  {
                    option: 'Nerå',
                  }
                ]
              }
            ]
          })
          cy.visit('http://localhost:3000')
        })
        it('Survey can be answered', function() {
          cy.get('#take-survey').click()
          cy.get('.survey-radio').eq(1).click()
          cy.get('.survey-radio').eq(3).click()
          cy.contains('Submit').click()
          cy.contains("Your answers to the survey 'Food Survey' were saved!")
        })
        it('All the questions must be answered in the survey', function() {
          cy.get('#take-survey').click()
          cy.get('.survey-radio').eq(1).click()
          cy.contains('Submit').click()
          cy.contains('You must answer to all questions')
        })
        it('Survey appears in my surveys', function() {
          cy.get('#my-surveys').click()
          cy.contains('Surveys by Teemu Testaaja')
          cy.contains('Food Survey')
        })
        it('Survey can be deleted', function() {
          cy.get('#my-surveys').click()
          cy.contains('Delete Survey').click()
          cy.get('html').should('contain', "Survey 'Food Survey' deleted.")
          cy.get('html').should('contain', 'You have no surveys.')
        })
        it('Results can be viewed', function() {
          cy.get('#my-surveys').click()
          cy.contains('View results').click()
          cy.get('html').should('contain', 'Food Survey')
          cy.get('html').should('contain', 'No answers yet.')
          cy.get('html').should('contain', 'Created by Teemu Testaaja')
        })
        it('Results contain data from answers', function() {
          cy.get('#take-survey').click()
          cy.get('.survey-radio').eq(1).click()
          cy.get('.survey-radio').eq(3).click()
          cy.contains('Submit').click()
          cy.get('#my-surveys').click()
          cy.contains('View results').click()
          cy.get('html').should('contain', '1 responses')
          cy.get('html').should('contain', 'What is your favorite ice cream?')
          cy.get('html').should('contain', 'Chocolate')
        })
        it('User can be deleted and user surveys are deleted with it', function() {
          cy.get('#my-surveys').click()
          cy.get('#delete-account').click()
          cy.get('html').should('contain', "Your account 'testi' and your surveys have been deleted.")
          cy.reload()
          cy.window()
            .its('store')
            .invoke('getState')
            .its('users')
            .should('have.length', 0)
          cy.window()
            .its('store')
            .invoke('getState')
            .its('surveys')
            .should('have.length', 0)
        })
      })
    })
  })
})