describe('Survey ', function() {
  it('Login page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login to application')
  })
})