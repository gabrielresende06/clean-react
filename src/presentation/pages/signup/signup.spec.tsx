import React from 'react'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import { Helper, ValidationStub } from '@/presentation/test'
import '@testing-library/jest-dom'
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
  const sut = render(<Signup validation={validationStub} />)
  return {
    sut,
    validationStub
  }
}

const initializationInput = (inputId: string, value: string = faker.random.word()): HTMLElement => {
  const input = screen.getByTestId(inputId)
  fireEvent.input(input, { target: { value } })

  return input
}

describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisable('submit')
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', 'Campo obrigatório')
    Helper.testStatusForField('password', 'Campo obrigatório')
    Helper.testStatusForField('passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })

    initializationInput('name')
    Helper.testStatusForField('name', validationError)
  })
})
