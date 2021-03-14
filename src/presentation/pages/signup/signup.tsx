import React, { useEffect } from 'react'
import { currentAccountState, Footer, FormStatus, Input, LoginHeader as Header } from '@/presentation/components'
import Styles from './signup-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { signUpState } from '@/presentation/pages/signup/components'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const Signup: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const resetSignupState = useResetRecoilState(signUpState)
  const history = useHistory()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(signUpState)

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState(oldState => ({ ...oldState, [`${field}Error`]: validation.validate(field, formData) }))
    setState(oldState => ({
      ...oldState,
      isFormInvalid:
                !!oldState.nameError ||
                !!oldState.emailError ||
                !!oldState.passwordError ||
                !!oldState.passwordConfirmationError
    }))
  }

  useEffect(() => resetSignupState(), [])
  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      setState(oldState => ({ ...oldState, isLoading: true }))
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(oldState => ({
        ...oldState,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.signupWrap}>
        <Header />
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
            <h2>Criar conta</h2>

            <Input type="text" name="name" placeholder="Digite seu nome" state={state} setState={setState} />
            <Input type="email" name="email" placeholder="Digite seu e-mail" state={state} setState={setState} />
            <Input type="password" name="password" placeholder="Digite sua senha" state={state} setState={setState} />
            <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha" state={state} setState={setState} />

            <button data-testid="submit"
                    disabled={state.isFormInvalid}
                    className={Styles.submit} type="submit">Criar</button>
            <Link data-testid='login' to="/login" replace className={Styles.link}>
                Voltar Para Login
            </Link>

            <FormStatus state={state} />
        </form>
        <Footer />
    </div>
  )
}

export default Signup
