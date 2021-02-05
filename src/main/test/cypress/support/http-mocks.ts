import * as faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.server()
  cy.route({
    method: 'POST',
    url,
    status: 401,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockEmailInUseError = (url: RegExp): void => {
  cy.server()
  cy.route({
    method: 'POST',
    url,
    status: 403,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: string): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: 400,
    response: {
      error: faker.random.words()
    }
  }).as('request')
}

export const mockOk = (url: RegExp, method: string, response: any): void => {
  cy.server()
  cy.route({
    method,
    url,
    status: 200,
    response
  }).as('request')
}
