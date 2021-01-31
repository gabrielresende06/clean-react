import React from 'react'
import '@testing-library/jest-dom'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub: validationStub
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    const errorWrapper = screen.getByTestId('error-wrap')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveProperty('title', validationError)
    expect(emailStatus).toHaveTextContent('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveProperty('title', validationError)
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    const email = faker.internet.email()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const emailInput = screen.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy).toHaveBeenCalledWith('email', email)
  })

  test('Should call Validation with correct password', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()
    const password = faker.internet.password()

    const validationSpy = jest.spyOn(validationStub, 'validate')
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy).toHaveBeenCalledWith('password', password)
  })

  test('Should show email error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveProperty('title', validationStub.errorMessage)
    expect(emailStatus).toHaveTextContent('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveProperty('title', validationStub.errorMessage)
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordStatus = screen.getByTestId('email-status')
    expect(passwordStatus).toHaveProperty('title', 'Tudo certo!')
    expect(passwordStatus).toHaveTextContent('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveProperty('title', 'Tudo certo!')
    expect(passwordStatus).toHaveTextContent('🟢')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeEnabled()
  })

  test('Should show spinner on submit ', () => {
    makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)

    const spinner = screen.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })
})
