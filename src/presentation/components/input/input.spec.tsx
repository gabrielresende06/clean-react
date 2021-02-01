import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import Input from './input'
import '@testing-library/jest-dom'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  return render(
        <Context.Provider value={{ state: { errors: { field: '' } } }}>
            <Input name='field' />
        </Context.Provider>
  )
}

describe('InputComponent', () => {
  test('Should begin with readOnly', () => {
    makeSut()
    const input = screen.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
