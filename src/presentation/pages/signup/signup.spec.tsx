import React from 'react'
import { render, RenderResult } from '@testing-library/react'
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

    Helper.initializationInput('name')
    Helper.testStatusForField('name', validationError)
  })
})
