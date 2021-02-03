import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import '@testing-library/jest-dom'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock , Helper } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationStub.errorMessage = params?.validationError
  const sut = render(
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
      </Router>
  )
  return {
    sut,
    validationStub,
    authenticationSpy,
    saveAccessTokenMock
  }
}

describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisable('submit')
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  test('Should call Validation with correct email', () => {
    const { validationStub } = makeSut()

    const email = faker.internet.email()
    const validationSpy = jest.spyOn(validationStub, 'validate')

    Helper.initializationInput('email', email)
    expect(validationSpy).toHaveBeenCalledWith('email', email)
  })

  test('Should call Validation with correct password', () => {
    const { validationStub } = makeSut()

    const password = faker.internet.password()
    const validationSpy = jest.spyOn(validationStub, 'validate')

    Helper.initializationInput('password', password)
    expect(validationSpy).toHaveBeenCalledWith('password', password)
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

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.initializationInput('password')
    Helper.initializationInput('email')

    Helper.testButtonIsEnabled('submit')
  })

  test('Should show spinner on submit ', () => {
    makeSut()

    Helper.initializationInput('password')
    Helper.initializationInput('email')

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)

    Helper.testElementExist('spinner')
  })

  test('Should call Authentication with corre values', () => {
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

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })

    Helper.initializationInput('email')

    const form = screen.getByTestId('form')
    fireEvent.submit(form)

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

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()

    Helper.initializationInput('email')
    Helper.initializationInput('password')

    const submitButton = screen.getByTestId('submit')
    await fireEvent.click(submitButton)

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signup page', async () => {
    makeSut()

    const register = screen.getByTestId('signup')
    fireEvent.click(register)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
