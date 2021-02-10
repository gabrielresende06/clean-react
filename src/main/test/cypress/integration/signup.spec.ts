import { testInputStatus, testMainError } from '../utils/form-helper'
import faker from 'faker'
import * as Http from '../utils/http-mocks'

const baseUrl: string = Cypress.config().baseUrl

const path = /signup/
export const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
export const mockOk = (): void => Http.mockOk(path, 'POST', 'fx:account')

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.internet.password(5)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    testInputStatus('name', 'Campo obrigatório')
    cy.getByTestId('name').should('have.attr', 'readonly')
    testInputStatus('email', 'Campo obrigatório')
    cy.getByTestId('email').should('have.attr', 'readonly')
    testInputStatus('password', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readonly')
    testInputStatus('passwordConfirmation', 'Campo obrigatório')
    cy.getByTestId('passwordConfirmation').should('have.attr', 'readonly')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if api is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('name', 'Valor inválido')

    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'Valor inválido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if api is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    testInputStatus('name')

    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')

    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    testInputStatus('password')

    cy.getByTestId('passwordConfirmation').focus().type(password)
    testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present EmailInUseError on 403', () => {
    mockEmailInUseError()
    simulateValidSubmit()
    testMainError('Esse e-mail já está em uso')
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('should present unexpectedError on 400', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/signup`)
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
    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())
    const password = faker.internet.password(5)
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)
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
