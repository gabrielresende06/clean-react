import React from 'react'
import { render, screen } from '@testing-library/react'
import Input from './input'
import '@testing-library/jest-dom'
import Context from '@/presentation/contexts/form/form-context'

describe('InputComponent', () => {
  test('Should begin with readOnly', () => {
    render(
        <Context.Provider value={{ state: { errors: { field: '' } } }}>
            <Input name='field' />
        </Context.Provider>
    )
    const input = screen.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
