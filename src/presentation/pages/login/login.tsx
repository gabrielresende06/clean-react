import React, { useEffect, useReducer } from 'react'
import { Link, useHistory } from 'react-router-dom'
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
  const history = useHistory()
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
    dispatch({ type: 'errorEmail', value: validation.validate('email', state.email) })
  }, [state.email])

  useEffect(() => {
    dispatch({ type: 'errorPassword', value: validation.validate('password', state.password) })
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      dispatch({ type: 'setLoading', bool: true })
      if (state.isLoading || state.errors.email || state.errors.password) {
        return
      }
      const account = await authentication.auth({ email: state.email, password: state.password })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      dispatch({ type: 'setMessage', value: error.message })
      dispatch({ type: 'setLoading', bool: false })
    }
  }

  return (
    <div className={Styles.login}>
        <Header />
        <Context.Provider value={{ state, dispatch }}>
            <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>

                <Input type="email" name="email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" placeholder="Digite sua senha" />

                <button data-testid='submit' disabled={!!state.errors.email || !!state.errors.password || state.isLoading} className={Styles.submit} type="submit">Entrar</button>
                <Link data-testid='signup' to='/signup' className={Styles.link}>
                    Criar Conta
                </Link>

                <FormStatus />
            </form>
        </Context.Provider>
        <Footer />
    </div>
  )
}

export default Login
