describe('Survey app', function() {
  describe('When not signed up', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
    it('Login page can be opened', function() {
      cy.contains('Login to application')
    })
    it('App should have the right initial state', function() {
      cy.window()
        .its('store')
        .invoke('getState')
        .its('users')
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
  })
})