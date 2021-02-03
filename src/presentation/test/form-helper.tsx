import { fireEvent, screen } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (field: string, count: number): void => {
  const elementWrapper = screen.getByTestId(field)
  expect(elementWrapper.childElementCount).toBe(count)
}

export const testButtonIsDisable = (field: string): void => {
  const submitButton = screen.getByTestId(field)
  expect(submitButton).toBeDisabled()
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`)
  expect(fieldStatus).toHaveProperty('title', validationError || 'Tudo certo!')
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢')
}

export const initializationInput = (inputId: string, value: string = faker.random.word()): HTMLElement => {
  const input = screen.getByTestId(inputId)
  fireEvent.input(input, { target: { value } })

  return input
}
