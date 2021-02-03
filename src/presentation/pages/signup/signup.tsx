import React, { useEffect, useReducer } from 'react'
import { Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import Styles from './signup-styles.scss'
import { reducer } from '@/presentation/pages/signup/reducer'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
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
    try {
      if (
        state.isLoading ||
              state.errors.name ||
              state.errors.email ||
              state.errors.password ||
              state.errors.passwordConfirmation
      ) {
        return
      }

      dispatch({ type: 'setLoading', bool: true })

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      dispatch({ type: 'setMessage', value: error.message })
      dispatch({ type: 'setLoading', bool: false })
    }
  }

  return (
    <div className={Styles.signup}>
        <Header />
        <Context.Provider value={{ state, dispatch }}>
            <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
                <h2>Criar conta</h2>

                <Input type="text" name="name" placeholder="Digite seu nome" />
                <Input type="email" name="email" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" placeholder="Digite sua senha" />
                <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" />

                <button data-testid="submit"
                        disabled={!!state.errors.name || !!state.errors.email || !!state.errors.password || !!state.errors.passwordConfirmation || state.isLoading}
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
