import * as faker from 'faker'
import { testInputStatus, testMainError } from '../utils/form-helper'
import * as Http from '../utils/http-mocks'

const path = /login/
export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(path)
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
export const mockOk = (): void => Http.mockOk(path, 'POST', 'fx:account')

const baseUrl: string = Cypress.config().baseUrl

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.internet.password(5))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readonly')
    testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readonly')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if api is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if api is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present invalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    testMainError('Credencias inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present unexpectedError on 400', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should save AccountModel if valid credentials are provided', () => {
    mockOk()
    simulateValidSubmit()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => { assert.isOk(window.localStorage.getItem('account')) })
  })

  it('should prevent multiple submit', () => {
    mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.internet.password(5))
    cy.getByTestId('submit').dblclick()
    cy.wait('@request')
    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if api is invalid', () => {
    mockOk()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.wait('@request')
    cy.get('@request.all').should('have.length', 0)
  })
})
