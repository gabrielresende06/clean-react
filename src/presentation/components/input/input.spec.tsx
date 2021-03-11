import React from 'react'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import Input from './input'
import '@testing-library/jest-dom'
import * as faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
      <Input name={fieldName} state={{}} setState={null} />
  )
}

describe('InputComponent', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement
    const label = screen.getByTestId(`${field}-label`)
    fireEvent.click(label)
    expect(input.readOnly).toBe(false)
    expect(document.activeElement).toBe(input)
  })
})
