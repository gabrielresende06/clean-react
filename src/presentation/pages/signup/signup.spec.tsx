import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import '@testing-library/jest-dom'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock } from '@/presentation/test'
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

const initializationInput = (inputId: string, value: string = faker.random.word()): HTMLElement => {
  const input = screen.getByTestId(inputId)
  fireEvent.input(input, { target: { value } })

  return input
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  const emailStatus = screen.getByTestId(`${fieldName}-status`)
  expect(emailStatus).toHaveProperty('title', validationError || 'Tudo certo!')
  expect(emailStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    const errorWrapper = screen.getByTestId('error-wrap')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeDisabled()

    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
  })

  test('Should call Validation with correct email', () => {
    const { validationStub } = makeSut()

    const email = faker.internet.email()
    const validationSpy = jest.spyOn(validationStub, 'validate')

    initializationInput('email', email)
    expect(validationSpy).toHaveBeenCalledWith('email', email)
  })

  test('Should call Validation with correct password', () => {
    const { validationStub } = makeSut()

    const password = faker.internet.password()
    const validationSpy = jest.spyOn(validationStub, 'validate')

    initializationInput('password', password)
    expect(validationSpy).toHaveBeenCalledWith('password', password)
  })

  test('Should show email error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    initializationInput('email')
    testStatusForField('email', validationStub.errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    initializationInput('password')
    testStatusForField('password', validationStub.errorMessage)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    initializationInput('email')
    testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    initializationInput('password')
    testStatusForField('password')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    initializationInput('password')
    initializationInput('email')

    const submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeEnabled()
  })

  test('Should show spinner on submit ', () => {
    makeSut()

    initializationInput('password')
    initializationInput('email')

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with corre values', () => {
    const { authenticationSpy } = makeSut()

    const password = faker.internet.password()
    const email = faker.internet.email()
    initializationInput('password', password)
    initializationInput('email', email)

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', () => {
    const { authenticationSpy } = makeSut()

    initializationInput('password')
    initializationInput('email')

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)
    fireEvent.click(submitButton)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })

    initializationInput('email')

    const form = screen.getByTestId('form')
    fireEvent.submit(form)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(new InvalidCredentialsError()))

    initializationInput('email')
    initializationInput('password')

    const submitButton = screen.getByTestId('submit')
    await fireEvent.click(submitButton)

    const mainError = screen.getByTestId('main-error')
    expect(mainError).toHaveTextContent(error.message)

    const errorWrapper = screen.getByTestId('error-wrap')
    expect(errorWrapper.childElementCount).toBe(1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()

    initializationInput('email')
    initializationInput('password')

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