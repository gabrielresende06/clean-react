import * as Helper from '../utils/helpers'
import * as Http from '../utils/http-mocks'

const path = /surveys/
export const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
export const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => Helper.setLocalStorageItem('account', account))
  })

  it('should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()
    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()
    cy.visit('')
    const account = Helper.getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', account.name)
  })

  it('should logout on logout link click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helper.testUrl('/login')
  })
})