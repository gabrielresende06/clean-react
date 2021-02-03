import React from 'react'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import { Helper, ValidationStub, AddAccountSpy } from '@/presentation/test'
import '@testing-library/jest-dom'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Signup validation={validationStub} addAccount={addAccountSpy} />)
  return {
    sut,
    addAccountSpy
  }
}

const simulateValidSubmit = async (
  name: string = faker.name.findName(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  Helper.initializationInput('name', name)
  Helper.initializationInput('email', email)
  Helper.initializationInput('password', password)
  Helper.initializationInput('passwordConfirmation', password)

  const submitButton = screen.getByTestId('submit')
  await fireEvent.click(submitButton)
}

describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisable('submit')
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.initializationInput('name')
    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.initializationInput('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.initializationInput('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show password confirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.initializationInput('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.initializationInput('name')
    Helper.testStatusForField('name')
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

  test('Should show valid password confirmation state if Validation succeeds', () => {
    makeSut()
    Helper.initializationInput('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.initializationInput('name')
    Helper.initializationInput('email')
    Helper.initializationInput('password')
    Helper.initializationInput('passwordConfirmation')

    Helper.testButtonIsEnabled('submit')
  })

  test('Should show spinner on submit ', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExist('spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()

    const name = faker.name.findName()
    const password = faker.internet.password()
    const email = faker.internet.email()

    await simulateValidSubmit(name, email, password)

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })
})
