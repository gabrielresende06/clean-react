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

export const testButtonIsEnabled = (field: string): void => {
  const submitButton = screen.getByTestId(field)
  expect(submitButton).toBeEnabled()
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(`${fieldName}`)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError ?? '')
  expect(label.title).toBe(validationError ?? '')
}

export const initializationInput = (inputId: string, value: string = faker.random.word()): HTMLElement => {
  const input = screen.getByTestId(inputId)
  fireEvent.input(input, { target: { value } })

  return input
}

export const testElementExist = (field: string): void => {
  const element = screen.getByTestId(field)
  expect(element).toBeTruthy()
}
