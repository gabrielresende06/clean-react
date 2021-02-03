import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import '@testing-library/jest-dom'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Signup />)
  return {
    sut
  }
}

const testChildCount = (field: string, count: number): void => {
  const elementWrapper = screen.getByTestId(field)
  expect(elementWrapper.childElementCount).toBe(count)
}

const testButtonIsDisable = (field: string): void => {
  const submitButton = screen.getByTestId(field)
  expect(submitButton).toBeDisabled()
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus).toHaveProperty('title', validationError || 'Tudo certo!')
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

describe('Signup Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut()

    testChildCount('error-wrap', 0)
    testButtonIsDisable('submit')
    testStatusForField('name', validationError)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
    testStatusForField('passwordConfirmation', validationError)
  })
})
