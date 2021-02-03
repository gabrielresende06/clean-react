import React, { useEffect, useReducer } from 'react'
import { Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './signup-styles.scss'
import { reducer } from '@/presentation/pages/signup/reducer'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {
      message: '',
      name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  })

  useEffect(() => {
    dispatch({ type: 'errorName', value: validation.validate('name', state.name) })
  }, [state.name])

  useEffect(() => {
    dispatch({ type: 'errorEmail', value: validation.validate('email', state.email) })
  }, [state.email])

  useEffect(() => {
    dispatch({ type: 'errorPassword', value: validation.validate('password', state.password) })
  }, [state.password])

  useEffect(() => {
    dispatch({ type: 'errorPasswordConfirmation', value: validation.validate('passwordConfirmation', state.passwordConfirmation) })
  }, [state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    dispatch({ type: 'setLoading', bool: true })
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation
    })
  }

  return (
    <div className={Styles.signup}>
        <Header />
        <Context.Provider value={{ state, dispatch }}>
            <form className={Styles.form} onSubmit={handleSubmit}>
                <h2>Criar conta</h2>

                <Input type="text" name="name" placeholder="Digite seu nome" />
                <Input type="email" name="email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" placeholder="Digite sua senha" />
                <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />

                <button data-testid="submit"
                        disabled={!!state.errors.name || !!state.errors.email || !!state.errors.password || !!state.errors.passwordConfirmation}
                        className={Styles.submit} type="submit">Criar</button>
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
