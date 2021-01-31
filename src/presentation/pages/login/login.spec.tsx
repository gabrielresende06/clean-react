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

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationStub()
  validationSpy.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationStub: validationSpy
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { validationStub } = makeSut()

    const errorWrapper = screen.getByTestId('error-wrap')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveProperty('title', validationStub.errorMessage)
    expect(emailStatus).toHaveTextContent('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveProperty('title', validationStub.errorMessage)
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { validationStub } = makeSut()
    const email = faker.internet.email()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy).toHaveBeenCalledWith('email', email)
  })

  test('Should call Validation with correct password', () => {
    const { validationStub } = makeSut()
    const password = faker.internet.password()

    const validationSpy = jest.spyOn(validationStub, 'validate')
    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy).toHaveBeenCalledWith('password', password)
  })

  test('Should show email error if Validation fails', () => {
    const { validationStub } = makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveProperty('title', validationStub.errorMessage)
    expect(emailStatus).toHaveTextContent('🔴')
  })

  test('Should show password error if Validation fails', () => {
    const { validationStub } = makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveProperty('title', validationStub.errorMessage)
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = null

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordStatus = screen.getByTestId('email-status')
    expect(passwordStatus).toHaveProperty('title', 'Tudo certo!')
    expect(passwordStatus).toHaveTextContent('🟢')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = null

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveProperty('title', 'Tudo certo!')
    expect(passwordStatus).toHaveTextContent('🟢')
  })
})
