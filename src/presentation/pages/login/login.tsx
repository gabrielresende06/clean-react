import React, { useReducer } from 'react'
import Styles from './login-styles.scss'
import { Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

export type LoginState = {
  isLoading: boolean
  errors?: {
    message?: string
    email?: string
    password?: string
  }
}

type Action = { type: string }

const reducer = (state: LoginState, action: Action): LoginState => {
  switch (action.type) {
    default:
      return state
  }
}

const Login: React.FC = () => {
  const [state] = useReducer(reducer, {
    isLoading: false,
    errors: {
      message: '',
      email: 'Campo obrigatório',
      password: 'Campo obrigatório'
    }
  })

  return (
    <div className={Styles.login}>
        <Header />
        <Context.Provider value={state}>
            <form className={Styles.form}>
                <h2>Login</h2>

                <Input type="email" name="email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" placeholder="Digite sua senha" />

                <button data-testid='submit' disabled className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>
                    Criar Conta
                </span>

                <FormStatus />
            </form>
        </Context.Provider>
        <Footer />
    </div>
  )
}

export default Login
