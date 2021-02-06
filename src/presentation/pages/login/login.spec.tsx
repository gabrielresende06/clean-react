import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import '@testing-library/jest-dom'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub , Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  validationStub.errorMessage = params?.validationError
  const sut = render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Login validation={validationStub} authentication={authenticationSpy} />
        </Router>
      </ApiContext.Provider>
  )
  return {
    sut,
    validationStub,
    authenticationSpy,
    setCurrentAccountMock
  }
}

describe('LoginComponent', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisable('submit')
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    Helper.initializationInput('email')
    Helper.testStatusForField('email', validationStub.errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    Helper.initializationInput('password')
    Helper.testStatusForField('password', validationStub.errorMessage)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.initializationInput('email')
    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.initializationInput('password')
    Helper.testStatusForField('password')
  })

  test('Should enable submit button if api is valid', () => {
    makeSut()

    Helper.initializationInput('password')
    Helper.initializationInput('email')

    Helper.testButtonIsEnabled('submit')
  })

  test('Should show spinner on submit ', async () => {
    makeSut()

    Helper.initializationInput('password')
    Helper.initializationInput('email')

    const submitButton = screen.getByTestId('submit')
    await fireEvent.click(submitButton)

    Helper.testElementExist('spinner')
  })

  test('Should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut()

    const password = faker.internet.password()
    const email = faker.internet.email()
    Helper.initializationInput('password', password)
    Helper.initializationInput('email', email)

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { authenticationSpy } = makeSut()

    Helper.initializationInput('password')
    Helper.initializationInput('email')

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)
    fireEvent.click(submitButton)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if api is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })

    Helper.initializationInput('email')

    const form = screen.getByTestId('form')
    await fireEvent.submit(form)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(new InvalidCredentialsError()))

    Helper.initializationInput('email')
    Helper.initializationInput('password')

    const submitButton = screen.getByTestId('submit')
    await fireEvent.click(submitButton)

    const mainError = screen.getByTestId('main-error')
    expect(mainError).toHaveTextContent(error.message)

    Helper.testChildCount('error-wrap', 1)
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()

    Helper.initializationInput('email')
    Helper.initializationInput('password')

    const submitButton = screen.getByTestId('submit')
    await fireEvent.click(submitButton)

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', () => {
    makeSut()

    const register = screen.getByTestId('signup-link')
    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
