const baseUrl: string = Cypress.config().baseUrl

describe('PrivateRoutes', () => {
  it('should logout if survey-list has no token', () => {
    cy.visit('')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
