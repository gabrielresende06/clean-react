import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import Styles from './login-styles.scss'
import { Authentication } from '@/domain/usecases'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(oldState => ({ ...oldState, [`${field}Error`]: validation.validate(field, formData) }))
    setState(oldState => ({ ...oldState, isFormInvalid: !!oldState.emailError || !!oldState.passwordError }))
  }

  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({ email: state.email, password: state.password })
      await setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.loginWrap}>
        <Header />
        <FormContext.Provider value={{ state, setState }}>
            <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>

                <Input type="email" name="email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" placeholder="Digite sua senha" />

                <button data-testid='submit' disabled={!!state.emailError || !!state.passwordError || state.isLoading} className={Styles.submit} type="submit">Entrar</button>
                <Link data-testid='signup-link' to='/signup' className={Styles.link}>
                    Criar Conta
                </Link>

                <FormStatus />
            </form>
        </FormContext.Provider>
        <Footer />
    </div>
  )
}

export default Login
