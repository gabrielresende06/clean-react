import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Login } from '@/presentation/pages'

describe('Login Component', () => {
  test('Should start with initial state', () => {
    render(<Login />)
    const errorWrapper = screen.getByTestId('error-wrap')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitButton = screen.getByTestId('submit')
    expect(submitButton).toBeDisabled()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus).toHaveProperty('title', 'Campo obrigatório')
    expect(emailStatus).toHaveTextContent('🔴')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus).toHaveProperty('title', 'Campo obrigatório')
    expect(passwordStatus).toHaveTextContent('🔴')
  })
})
