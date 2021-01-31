import React, { useEffect, useReducer } from 'react'
import { Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import reducer from '@/presentation/pages/login/reducer'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    email: '',
    errors: {
      message: '',
      email: 'Campo obrigatório',
      password: 'Campo obrigatório'
    }
  })

  useEffect(() => {
    validation.validate({ email: state.email })
  }, [state.email])

  return (
    <div className={Styles.login}>
        <Header />
        <Context.Provider value={{ state, dispatch }}>
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
