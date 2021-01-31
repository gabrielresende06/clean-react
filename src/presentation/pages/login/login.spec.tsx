import React from 'react'
import { render, screen } from '@testing-library/react'
import { Login } from '@/presentation/pages'

describe('Login Component', () => {
  test('Should not render spinner and error on start', () => {
    render(<Login />)
    const errorWrapper = screen.getByTestId('error-wrap')
    expect(errorWrapper.childElementCount).toBe(0)
  })
})
