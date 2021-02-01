import React from 'react'
import { render, RenderResult, screen, fireEvent } from '@testing-library/react'
import Input from './input'
import '@testing-library/jest-dom'
import Context from '@/presentation/contexts/form/form-context'
import * as faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
        <Context.Provider value={{ state: { errors: { field: '' } } }}>
            <Input name={fieldName} />
        </Context.Provider>
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
})
