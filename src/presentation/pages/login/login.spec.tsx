import React from 'react'
import '@testing-library/jest-dom'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import { Login } from '@/presentation/pages'
import { ValidationSpy } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    makeSut()

    const errorWrapper = screen.getByTestId('error-wrap')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveProperty('title', 'Campo obrigatório')
    expect(emailStatus).toHaveTextContent('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveProperty('title', 'Campo obrigatório')
    expect(passwordStatus).toHaveTextContent('🔴')
  })

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut()
    const email = faker.internet.email()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('Should call Validation with correct password', () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })
})
