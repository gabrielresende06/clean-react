import React, { useEffect, useReducer } from 'react'
import { Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import reducer from '@/presentation/pages/login/reducer'
import Styles from './login-styles.scss'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    email: '',
    password: '',
    errors: {
      message: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    console.log(state.email)
    dispatch({ type: 'errorEmail', value: validation.validate('email', state.email) })
  }, [state.email])

  useEffect(() => {
    console.log(state.password)
    dispatch({ type: 'errorPassword', value: validation.validate('password', state.password) })
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    dispatch({ type: 'setLoading', bool: true })
    await authentication.auth({ email: state.email, password: state.password })
  }

  return (
    <div className={Styles.login}>
        <Header />
        <Context.Provider value={{ state, dispatch }}>
            <form className={Styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>

                <Input type="email" name="email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" placeholder="Digite sua senha" />

                <button data-testid='submit' disabled={!!state.errors.email || !!state.errors.password} className={Styles.submit} type="submit">Entrar</button>
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
