import React, { useReducer } from 'react'
import { Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './signup-styles.scss'
import { reducer } from '@/presentation/pages/signup/reducer'

const Signup: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    errors: {
      message: '',
      name: 'Campo obrigatório',
      email: 'Campo obrigatório',
      password: 'Campo obrigatório',
      passwordConfirmation: 'Campo obrigatório'
    }
  })
  return (
    <div className={Styles.signup}>
        <Header />
        <Context.Provider value={{ state, dispatch }}>
            <form className={Styles.form} >
                <h2>Criar conta</h2>

                <Input type="text" name="name" placeholder="Digite seu nome" />
                <Input type="email" name="email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" placeholder="Digite sua senha" />
                <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />

                <button data-testid="submit" disabled className={Styles.submit} type="submit">Criar</button>
                <span className={Styles.link}>
                    Voltar Para Login
                </span>

                <FormStatus />
            </form>
        </Context.Provider>
        <Footer />
    </div>
  )
}

export default Signup
