import React from 'react'
import faker from 'faker'
import '@testing-library/jest-dom'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationStub } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    validationStub,
    authenticationSpy
  }
}

const initializationInput = (inputId: string, value: string = faker.random.word()): HTMLElement => {
  const input = screen.getByTestId(inputId)
  fireEvent.input(input, { target: { value } })

  return input
}

const simulateStatusForField = (fieldName: string, validationError?: string): void => {
  const emailStatus = screen.getByTestId(`${fieldName}-status`)
  expect(emailStatus).toHaveProperty('title', validationError || 'Tudo certo!')
  expect(emailStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    const errorWrapper = screen.getByTestId('error-wrap')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeDisabled()

    simulateStatusForField('email', validationError)
    simulateStatusForField('password', validationError)
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
    simulateStatusForField('email', validationStub.errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    initializationInput('password')
    simulateStatusForField('password', validationStub.errorMessage)
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    initializationInput('email')
    simulateStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    initializationInput('password')
    simulateStatusForField('password')
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
})
